import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  AlertController,
  IonButton,
  IonContent,
  IonIcon,
  IonTextarea,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  calendarClearOutline,
  calendarOutline,
  checkmarkCircleOutline,
  refreshOutline,
  star,
  starOutline,
  chatbubbleOutline,
  trashOutline,
} from 'ionicons/icons';

import { ApiService } from '../../core/services/api.service';
import { AuthResponse, AuthService } from '../../core/services/auth.service';
import { ReservaService } from '../../core/services/reserva.service';
import { ResenaService } from '../../core/services/resena.service';
import { Reserva } from '../../shared/models/reserva';

registerLocaleData(localeEs, 'es-ES');

type VistaCitas = 'proximas' | 'historial' | 'todas';

@Component({
  selector: 'app-citas',
  standalone: true,
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonButton,
    IonContent,
    IonIcon,
    IonTextarea,
  ],
})
export class CitasPage implements OnDestroy {
  citas: Reserva[] = [];
  citasVisibles: Reserva[] = [];

  usuario: AuthResponse | null = null;
  vista: VistaCitas = 'proximas';

  empresaFiltroId: string | null = null;
  nombreEmpresaFiltro = '';

  proximasCount = 0;
  historialCount = 0;

  cargando = true;
  error = '';

  cancelandoId: string | null = null;
  ocultandoId: string | null = null;
  mensajeAccion = '';
  errorAccion = '';

  reservaConResenaId: string | null = null;
  enviandoResena = false;
  puntuacionResena = 0;
  comentarioResena = '';
  readonly puntuaciones = [1, 2, 3, 4, 5];

  cargandoResenas = false;

  private readonly reservasResenadas = new Set<string>();

  private clienteId = '';
  private versionCarga = 0;
  private destruida = false;
  private dialogoAbierto = false;
  private temporizador: ReturnType<typeof setInterval> | null = null;

  private readonly horasCancelacion = 24;

  private readonly etiquetasEstado: Record<string, string> = {
    PENDING: 'Pendiente',
    CONFIRMED: 'Confirmada',
    COMPLETED: 'Completada',
    CANCELLED: 'Cancelada',
    CANCELED: 'Cancelada',
    NO_SHOW: 'No asististe',
    REJECTED: 'Rechazada',
  };

  private readonly clasesEstado: Record<string, string> = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    CANCELED: 'cancelled',
    NO_SHOW: 'no-show',
    REJECTED: 'cancelled',
  };

  private readonly formatoFecha = new Intl.DateTimeFormat('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  constructor(
    private api: ApiService,
    private reservaService: ReservaService,
    private resenaService: ResenaService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private changeDetector: ChangeDetectorRef,
  ) {
    addIcons({
      calendarClearOutline,
      calendarOutline,
      chatbubbleOutline,
      checkmarkCircleOutline,
      refreshOutline,
      star,
      starOutline,
      trashOutline,
    });
  }

  ionViewWillEnter(): void {
    const queryParams = this.route.snapshot.queryParamMap;
    const empresaId = queryParams.get('empresaId');
    const vista = queryParams.get('vista');

    this.empresaFiltroId = empresaId;

    if (vista === 'proximas' || vista === 'historial' || vista === 'todas') {
      this.vista = vista;
    }

    this.iniciarTemporizador();
    void this.cargar();
  }

  ionViewWillLeave(): void {
    this.detenerTemporizador();
  }

  ngOnDestroy(): void {
    this.destruida = true;
    this.versionCarga++;
    this.detenerTemporizador();
  }

  tieneResena(cita: Reserva): boolean {
    return this.reservasResenadas.has(cita.id);
  }

  esCompletada(cita: Reserva): boolean {
    return this.normalizarEstado(cita.estado) === 'COMPLETED';
  }

  async cargar(): Promise<void> {
    const version = ++this.versionCarga;

    this.cargando = true;
    this.error = '';
    this.actualizarVista();

    try {
      const usuarioApi = await this.api.get<AuthResponse>('/auth/me');

      if (!this.esCargaActual(version)) {
        return;
      }

      this.clienteId = usuarioApi.userId;
      this.usuario = usuarioApi;

      try {
        const usuarioLocal = await this.authService.getCurrentUser();

        if (!this.esCargaActual(version)) {
          return;
        }

        if (usuarioLocal?.userId === usuarioApi.userId) {
          this.usuario = {
            ...usuarioLocal,
            ...usuarioApi,
            nombre: usuarioApi.nombre || usuarioLocal.nombre,
          };
        }
      } catch {
        // /auth/me ya aporta la información necesaria para esta pantalla.
      }

      const citas = await this.reservaService.listarPorCliente(
        usuarioApi.userId,
      );

      if (!this.esCargaActual(version)) {
        return;
      }

      if (!Array.isArray(citas)) {
        throw new Error('La respuesta de citas no es una lista.');
      }

      this.citas = [...citas];
      this.actualizarListado();

      await this.cargarResenasExistentes(version);
    } catch (error: unknown) {
      if (!this.esCargaActual(version)) {
        return;
      }

      console.error('Error al cargar Mis citas:', error);

      this.citas = [];
      this.citasVisibles = [];
      this.proximasCount = 0;
      this.historialCount = 0;
      this.reservasResenadas.clear();
      this.error = 'No hemos podido cargar tus citas.';
    } finally {
      if (this.esCargaActual(version)) {
        this.cargando = false;
        this.actualizarVista();
      }
    }
  }

  async abrirPerfil(): Promise<void> {
    await this.router.navigateByUrl('/tabs/perfil');
  }

  seleccionarVista(vista: VistaCitas): void {
    this.vista = vista;
    this.actualizarListado();
    this.actualizarVista();
  }

  trackByCita(_indice: number, cita: Reserva): string {
    return cita.id;
  }

  esProxima(cita: Reserva): boolean {
    const estado = this.normalizarEstado(cita.estado);
    const inicio = this.fechaHoraCita(cita);

    return (
      (estado === 'PENDING' || estado === 'CONFIRMED') &&
      Number.isFinite(inicio) &&
      inicio > Date.now()
    );
  }

  esCancelable(cita: Reserva): boolean {
    if (
      !this.clienteId ||
      cita.clienteId !== this.clienteId ||
      !this.esProxima(cita)
    ) {
      return false;
    }

    const inicio = this.fechaHoraCita(cita);
    const antelacion = this.horasCancelacion * 60 * 60 * 1000;

    return inicio - Date.now() >= antelacion;
  }

  puedeResenar(cita: Reserva): boolean {
    return (
      this.esCompletada(cita) &&
      cita.clienteId === this.clienteId &&
      !this.tieneResena(cita)
    );
  }

  esPendiente(cita: Reserva): boolean {
    return this.normalizarEstado(cita.estado) === 'PENDING';
  }

  esCancelada(cita: Reserva): boolean {
    return this.normalizarEstado(cita.estado) === 'CANCELLED';
  }

  esCancelacionAutomatica(cita: Reserva): boolean {
    return (
      this.esCancelada(cita) &&
      !cita.canceladoPor &&
      Boolean(cita.motivoCancelacion)
    );
  }

  async ocultarCitaCancelada(cita: Reserva): Promise<void> {
    if (
      !this.esCancelada(cita) ||
      this.ocultandoId !== null ||
      this.dialogoAbierto
    ) {
      return;
    }

    this.dialogoAbierto = true;

    try {
      const alerta = await this.alertController.create({
        header: 'Quitar de Mis citas',
        message:
          'Esta cita dejará de aparecer solo en tu listado. ' +
          'La empresa conservará su registro.',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Conservar cita',
            role: 'cancel',
          },
          {
            text: 'Quitar cita',
            role: 'confirm',
          },
        ],
      });

      await alerta.present();

      const { role } = await alerta.onDidDismiss();

      if (role !== 'confirm' || this.destruida) {
        return;
      }

      this.ocultandoId = cita.id;
      this.mensajeAccion = '';
      this.errorAccion = '';
      this.actualizarVista();

      await this.reservaService.ocultarParaCliente(cita.id);

      if (this.destruida) {
        return;
      }

      this.citas = this.citas.filter((item) => item.id !== cita.id);

      if (this.reservaConResenaId === cita.id) {
        this.cerrarResena();
      }

      this.actualizarListado();
      this.mensajeAccion = 'La cita se ha quitado de tu listado.';
    } catch (error: unknown) {
      if (!this.destruida) {
        this.errorAccion = this.mensajeErrorOcultarCita(error);
      }
    } finally {
      this.dialogoAbierto = false;
      this.ocultandoId = null;
      this.actualizarVista();
    }
  }

  async cancelarCita(cita: Reserva): Promise<void> {
    if (this.dialogoAbierto || this.cancelandoId !== null) {
      return;
    }

    if (!this.esCancelable(cita)) {
      this.errorAccion =
        'Esta cita ya no se puede cancelar desde la aplicación.';
      this.actualizarVista();
      return;
    }

    this.dialogoAbierto = true;

    try {
      const alerta = await this.alertController.create({
        header: 'Cancelar cita',
        message:
          '¿Quieres cancelar esta cita? Dejará de aparecer ' +
          'entre tus próximas reservas.',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Mantener cita',
            role: 'cancel',
          },
          {
            text: 'Sí, cancelar',
            role: 'confirm',
          },
        ],
      });

      await alerta.present();

      const { role } = await alerta.onDidDismiss();

      if (role !== 'confirm' || this.destruida) {
        return;
      }

      if (!this.esCancelable(cita)) {
        this.errorAccion = 'El plazo para cancelar esta cita ha terminado.';
        this.actualizarVista();
        return;
      }

      this.cancelandoId = cita.id;
      this.mensajeAccion = '';
      this.errorAccion = '';
      this.actualizarVista();

      const reservaActualizada = await this.reservaService.cancelar(cita.id);

      if (this.destruida) {
        return;
      }

      this.citas = this.citas.map((item) =>
        item.id === cita.id ? reservaActualizada : item,
      );

      this.actualizarListado();
      this.mensajeAccion = 'La cita se ha cancelado correctamente.';
    } catch (error: unknown) {
      if (!this.destruida) {
        this.errorAccion = this.mensajeErrorCancelacion(error);

        if (
          error instanceof HttpErrorResponse &&
          (error.status === 409 || error.status === 404)
        ) {
          await this.cargar();
        }
      }
    } finally {
      this.dialogoAbierto = false;
      this.cancelandoId = null;
      this.actualizarVista();
    }
  }

  abrirResena(cita: Reserva): void {
    if (!this.puedeResenar(cita) || this.enviandoResena) {
      return;
    }

    this.reservaConResenaId = cita.id;
    this.puntuacionResena = 0;
    this.comentarioResena = '';
    this.errorAccion = '';
    this.mensajeAccion = '';

    this.actualizarVista();
  }

  cerrarResena(): void {
    if (this.enviandoResena) {
      return;
    }

    this.reservaConResenaId = null;
    this.puntuacionResena = 0;
    this.comentarioResena = '';
    this.actualizarVista();
  }

  seleccionarPuntuacion(puntuacion: number): void {
    if (this.enviandoResena) {
      return;
    }

    this.puntuacionResena = puntuacion;
    this.actualizarVista();
  }

  esEstrellaSeleccionada(valor: number): boolean {
    return valor <= this.puntuacionResena;
  }

  async enviarResena(cita: Reserva): Promise<void> {
    if (
      !this.puedeResenar(cita) ||
      this.reservaConResenaId !== cita.id ||
      !Number.isInteger(this.puntuacionResena) ||
      this.puntuacionResena < 1 ||
      this.puntuacionResena > 5 ||
      this.enviandoResena
    ) {
      return;
    }

    const comentario = this.comentarioResena.trim();

    if (comentario.length > 500) {
      this.errorAccion = 'El comentario no puede superar 500 caracteres.';
      this.actualizarVista();
      return;
    }

    this.enviandoResena = true;
    this.errorAccion = '';
    this.mensajeAccion = '';
    this.actualizarVista();

    try {
      await this.resenaService.crear({
        reservaId: cita.id,
        puntuacion: this.puntuacionResena,
        comentario: comentario || null,
      });

      if (this.destruida) {
        return;
      }

      this.reservasResenadas.add(cita.id);
      this.reservaConResenaId = null;
      this.puntuacionResena = 0;
      this.comentarioResena = '';

      this.mensajeAccion =
        'Gracias. Tu reseña se ha publicado y aparecerá en la empresa.';
    } catch (error: unknown) {
      if (!this.destruida) {
        if (
          error instanceof HttpErrorResponse &&
          (error.status === 400 || error.status === 409)
        ) {
          this.reservasResenadas.add(cita.id);
          this.reservaConResenaId = null;
          this.puntuacionResena = 0;
          this.comentarioResena = '';
          this.errorAccion = 'Esta cita ya tiene una reseña publicada.';
        } else {
          this.errorAccion = this.mensajeErrorResena(error);
        }
      }
    } finally {
      this.enviandoResena = false;
      this.actualizarVista();
    }
  }

  estadoEnEspanol(estado: string | null | undefined): string {
    const normalizado = this.normalizarEstado(estado);

    return this.etiquetasEstado[normalizado] ?? 'Estado no disponible';
  }

  claseEstado(estado: string | null | undefined): string {
    const normalizado = this.normalizarEstado(estado);

    return this.clasesEstado[normalizado] ?? 'unknown';
  }

  fechaEnEspanol(fecha: string | null | undefined): string {
    if (!fecha) {
      return 'Fecha no disponible';
    }

    const fechaLocal = new Date(`${fecha}T12:00:00`);

    if (!Number.isFinite(fechaLocal.getTime())) {
      return 'Fecha no disponible';
    }

    return this.formatoFecha.format(fechaLocal);
  }

  horaFormateada(hora: string | null | undefined): string {
    return hora ? hora.slice(0, 5) : 'Hora no disponible';
  }

  private actualizarListado(): void {
    const citasDeEmpresa = this.empresaFiltroId
      ? this.citas.filter((cita) => cita.empresaId === this.empresaFiltroId)
      : this.citas;

    this.nombreEmpresaFiltro = this.empresaFiltroId
      ? citasDeEmpresa[0]?.empresaNombre || 'Esta empresa'
      : '';

    const proximas = citasDeEmpresa.filter((cita) => this.esProxima(cita));

    const historial = citasDeEmpresa.filter((cita) => !this.esProxima(cita));

    this.proximasCount = proximas.length;
    this.historialCount = historial.length;

    const origen =
      this.vista === 'proximas'
        ? proximas
        : this.vista === 'historial'
          ? historial
          : citasDeEmpresa;

    this.citasVisibles = [...origen].sort((a, b) => {
      const primera = `${a.fecha ?? ''}T${a.horaInicio ?? ''}`;
      const segunda = `${b.fecha ?? ''}T${b.horaInicio ?? ''}`;

      return this.vista === 'proximas'
        ? primera.localeCompare(segunda)
        : segunda.localeCompare(primera);
    });
  }

  private fechaHoraCita(cita: Reserva): number {
    if (!cita.fecha || !cita.horaInicio) {
      return Number.NaN;
    }

    return new Date(`${cita.fecha}T${cita.horaInicio}`).getTime();
  }

  private normalizarEstado(estado: string | null | undefined): string {
    return (estado ?? '')
      .trim()
      .toUpperCase()
      .replace(/[\s-]+/g, '_');
  }

  private esCargaActual(version: number): boolean {
    return !this.destruida && version === this.versionCarga;
  }

  private actualizarVista(): void {
    if (!this.destruida) {
      this.changeDetector.markForCheck();
    }
  }

  private iniciarTemporizador(): void {
    this.detenerTemporizador();

    this.temporizador = setInterval(() => {
      this.actualizarListado();
      this.actualizarVista();
    }, 30_000);
  }

  private detenerTemporizador(): void {
    if (this.temporizador !== null) {
      clearInterval(this.temporizador);
      this.temporizador = null;
    }
  }

  private async cargarResenasExistentes(versionCarga: number): Promise<void> {
    const empresasCompletadas = [
      ...new Set(
        this.citas
          .filter((cita) => this.esCompletada(cita) && Boolean(cita.empresaId))
          .map((cita) => cita.empresaId),
      ),
    ];

    this.reservasResenadas.clear();

    if (!empresasCompletadas.length) {
      this.actualizarVista();
      return;
    }

    this.cargandoResenas = true;
    this.actualizarVista();

    try {
      const resultados = await Promise.all(
        empresasCompletadas.map((empresaId) =>
          this.resenaService.listarPorEmpresa(empresaId),
        ),
      );

      if (!this.esCargaActual(versionCarga)) {
        return;
      }

      for (const resenasEmpresa of resultados) {
        for (const resena of resenasEmpresa) {
          if (resena.reservaId) {
            this.reservasResenadas.add(resena.reservaId);
          }
        }
      }
    } catch {
      // Si falla esta comprobación, no se interrumpe la carga de citas.
      // El backend sigue impidiendo publicar reseñas duplicadas.
    } finally {
      if (this.esCargaActual(versionCarga)) {
        this.cargandoResenas = false;
        this.actualizarVista();
      }
    }
  }

  private mensajeErrorOcultarCita(error: unknown): string {
    const mensajeServidor = this.obtenerMensajeError(error);

    if (mensajeServidor) {
      return mensajeServidor;
    }

    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        return 'Tu sesión ha caducado. Vuelve a iniciar sesión.';
      }

      if (error.status === 403) {
        return 'No tienes permiso para quitar esta cita.';
      }

      if (error.status === 409) {
        return 'Solo puedes quitar de tu lista una cita cancelada.';
      }

      if (error.status === 404) {
        return 'La cita ya no está disponible.';
      }
    }

    return 'No hemos podido quitar la cita. Inténtalo de nuevo.';
  }

  private mensajeErrorCancelacion(error: unknown): string {
    const mensajeServidor = this.obtenerMensajeError(error);

    if (mensajeServidor) {
      return mensajeServidor;
    }

    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        return 'No hay conexión con el servidor. Inténtalo de nuevo.';
      }

      if (error.status === 401) {
        return 'Tu sesión ha caducado. Vuelve a iniciar sesión.';
      }

      if (error.status === 403) {
        return 'No tienes permiso para cancelar esta cita.';
      }

      if (error.status === 409) {
        return 'La cita ya no se puede cancelar o quedan menos de 24 horas.';
      }

      if (error.status === 404) {
        return 'Esta cita ya no está disponible.';
      }
    }

    return 'No hemos podido cancelar la cita. Inténtalo de nuevo.';
  }

  private mensajeErrorResena(error: unknown): string {
    const mensajeServidor = this.obtenerMensajeError(error);

    if (mensajeServidor) {
      return mensajeServidor;
    }

    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        return 'Tu sesión ha caducado. Vuelve a iniciar sesión.';
      }

      if (error.status === 403) {
        return 'No tienes permiso para reseñar esta cita.';
      }

      if (error.status === 400 || error.status === 409) {
        return 'Esta cita ya tiene una reseña o ya no se puede reseñar.';
      }
    }

    return 'No hemos podido publicar tu reseña. Inténtalo de nuevo.';
  }

  private obtenerMensajeError(error: unknown): string | null {
    if (!(error instanceof HttpErrorResponse)) {
      return null;
    }

    const body: unknown = error.error;

    if (!body || typeof body !== 'object') {
      return null;
    }

    const datos = body as Record<string, unknown>;

    for (const campo of ['detail', 'message', 'error']) {
      const mensaje = datos[campo];

      if (typeof mensaje === 'string' && mensaje.trim()) {
        return mensaje;
      }
    }

    return null;
  }

  get totalCitasFiltro(): number {
    return this.empresaFiltroId
      ? this.citas.filter((cita) => cita.empresaId === this.empresaFiltroId)
          .length
      : this.citas.length;
  }

  async quitarFiltroEmpresa(): Promise<void> {
    this.empresaFiltroId = null;
    this.nombreEmpresaFiltro = '';
    this.actualizarListado();
    this.actualizarVista();

    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        empresaId: null,
        vista: null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
