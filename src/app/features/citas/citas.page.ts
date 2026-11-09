import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink,
} from '@angular/router';

import {
  AlertController,
  IonButton,
  IonContent,
  IonIcon,
  IonTextarea,
} from '@ionic/angular/standalone';

import {
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

import { Subscription } from 'rxjs';
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

import {
  AuthResponse,
  AuthService,
} from '../../core/services/auth.service';

import {
  ReservaService,
} from '../../core/services/reserva.service';

import {
  ResenaService,
} from '../../core/services/resena.service';

import {
  UsuarioService,
} from '../../core/services/usuario.service';

import {
  IdiomaService,
} from '../../core/services/idioma.service';

import {
  IdiomaApp,
} from '../../core/i18n/traducciones';

import {
  CITAS_TRADUCCIONES,
} from '../../core/i18n/citas.traducciones';

import {
  SelectorIdiomaComponent,
} from '../../shared/components/selector-idioma/selector-idioma.component';

import { Reserva } from '../../shared/models/reserva';

type VistaCitas = 'proximas' | 'historial' | 'todas';
type AccionCita = 'quitar' | 'cancelar' | 'resena';

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
    TranslatePipe,
    SelectorIdiomaComponent,
  ],
})
export class CitasPage implements OnDestroy {
  citas: Reserva[] = [];
  citasVisibles: Reserva[] = [];

  usuario: AuthResponse | null = null;
  avatarFallido = false;
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
  readonly horasCancelacion = 24;

  private readonly reservasResenadas = new Set<string>();

  private clienteId = '';
  private versionCarga = 0;
  private destruida = false;
  private dialogoAbierto = false;

  private temporizador:
    ReturnType<typeof setInterval> | null = null;

  private readonly idiomaSubscription: Subscription;

  private readonly locales: Record<IdiomaApp, string> = {
    es: 'es-ES',
    en: 'en-GB',
    fr: 'fr-FR',
    de: 'de-DE',
    ru: 'ru-RU',
    uk: 'uk-UA',
  };

  private readonly formatosFecha =
    new Map<string, Intl.DateTimeFormat>();

  private readonly formatosPrecio =
    new Map<string, Intl.NumberFormat>();

  private readonly etiquetasEstado: Record<string, string> = {
    PENDING: 'CITAS.ESTADO_PENDING',
    CONFIRMED: 'CITAS.ESTADO_CONFIRMED',
    COMPLETED: 'CITAS.ESTADO_COMPLETED',
    CANCELLED: 'CITAS.ESTADO_CANCELLED',
    CANCELED: 'CITAS.ESTADO_CANCELLED',
    NO_SHOW: 'CITAS.ESTADO_NO_SHOW',
    REJECTED: 'CITAS.ESTADO_REJECTED',
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

  constructor(
    private api: ApiService,
    private reservaService: ReservaService,
    private resenaService: ResenaService,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private changeDetector: ChangeDetectorRef,
    private translate: TranslateService,
    private idioma: IdiomaService,
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

    this.registrarTraducciones();

    this.idiomaSubscription =
      this.translate.onLangChange.subscribe(() => {
        this.actualizarVista();
      });
  }

  ionViewWillEnter(): void {
    const queryParams =
      this.route.snapshot.queryParamMap;

    const empresaId = queryParams.get('empresaId');
    const vista = queryParams.get('vista');

    this.empresaFiltroId = empresaId;

    if (
      vista === 'proximas' ||
      vista === 'historial' ||
      vista === 'todas'
    ) {
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
    this.idiomaSubscription.unsubscribe();
  }

  get fotoPerfil(): string {
    return this.usuario?.avatarUrl?.trim() ?? '';
  }

  get inicialPerfil(): string {
    return (
      this.usuario?.nombre?.trim().charAt(0).toUpperCase() ||
      '?'
    );
  }

  get totalCitasFiltro(): number {
    return this.empresaFiltroId
      ? this.citas.filter(
          (cita) =>
            cita.empresaId === this.empresaFiltroId,
        ).length
      : this.citas.length;
  }

  private get localeActual(): string {
    return this.locales[this.idioma.actual()];
  }

  marcarAvatarFallido(): void {
    this.avatarFallido = true;
    this.actualizarVista();
  }

  tieneResena(cita: Reserva): boolean {
    return this.reservasResenadas.has(cita.id);
  }

  esCompletada(cita: Reserva): boolean {
    return (
      this.normalizarEstado(cita.estado) === 'COMPLETED'
    );
  }

  async cargar(): Promise<void> {
    const version = ++this.versionCarga;

    this.cargando = true;
    this.error = '';
    this.actualizarVista();

    try {
      const usuarioApi =
        await this.api.get<AuthResponse>('/auth/me');

      if (!this.esCargaActual(version)) {
        return;
      }

      this.clienteId = usuarioApi.userId;
      this.usuario = usuarioApi;
      this.avatarFallido = false;

      try {
        const usuarioLocal =
          await this.authService.getCurrentUser();

        if (!this.esCargaActual(version)) {
          return;
        }

        if (usuarioLocal?.userId === usuarioApi.userId) {
          this.usuario = {
            ...usuarioLocal,
            ...usuarioApi,
            nombre:
              usuarioApi.nombre || usuarioLocal.nombre,
            avatarUrl:
              usuarioApi.avatarUrl !== undefined
                ? usuarioApi.avatarUrl
                : usuarioLocal.avatarUrl,
          };
        }
      } catch {
        // /auth/me permite continuar sin la sesión local.
      }

      this.actualizarVista();

      try {
        const perfil =
          await this.usuarioService.obtenerMiPerfil();

        if (!this.esCargaActual(version)) {
          return;
        }

        if (perfil.id === usuarioApi.userId) {
          this.usuario = {
            ...usuarioApi,
            nombre: perfil.nombre,
            email: perfil.email,
            rol: perfil.rol,
            avatarUrl: perfil.avatarUrl,
          };

          await this.authService.updateStoredUser(perfil);

          if (!this.esCargaActual(version)) {
            return;
          }

          this.avatarFallido = false;
          this.actualizarVista();
        }
      } catch {
        // Un fallo del perfil no bloquea las citas.
      }

      const citas =
        await this.reservaService.listarPorCliente(
          usuarioApi.userId,
        );

      if (!this.esCargaActual(version)) {
        return;
      }

      if (!Array.isArray(citas)) {
        throw new Error(
          'La respuesta de citas no es una lista.',
        );
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
      this.error = 'CITAS.ERROR_CARGAR';
    } finally {
      if (this.esCargaActual(version)) {
        this.cargando = false;
        this.actualizarVista();
      }
    }
  }

  async abrirChatEmpresa(cita: Reserva): Promise<void> {
    await this.router.navigate(['/tabs/mensajes'], {
      queryParams: {
        reservaId: cita.id,
      },
    });
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
    const antelacion =
      this.horasCancelacion * 60 * 60 * 1000;

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
    return (
      this.normalizarEstado(cita.estado) === 'PENDING'
    );
  }

  esCancelada(cita: Reserva): boolean {
    const estado = this.normalizarEstado(cita.estado);

    return estado === 'CANCELLED' || estado === 'CANCELED';
  }

  esCancelacionAutomatica(cita: Reserva): boolean {
    return (
      this.esCancelada(cita) &&
      !cita.canceladoPor &&
      Boolean(cita.motivoCancelacion)
    );
  }

  async ocultarCitaCancelada(
    cita: Reserva,
  ): Promise<void> {
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
        header: this.texto('QUITAR_TITULO'),
        message: this.texto('QUITAR_CONFIRMACION'),
        backdropDismiss: false,
        buttons: [
          {
            text: this.texto('CONSERVAR_CITA'),
            role: 'cancel',
          },
          {
            text: this.texto('QUITAR_CITA'),
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

      this.citas = this.citas.filter(
        (item) => item.id !== cita.id,
      );

      if (this.reservaConResenaId === cita.id) {
        this.cerrarResena();
      }

      this.actualizarListado();
      this.mensajeAccion = 'CITAS.EXITO_QUITAR';
    } catch (error: unknown) {
      if (!this.destruida) {
        this.errorAccion =
          this.claveErrorAccion(error, 'quitar');
      }
    } finally {
      this.dialogoAbierto = false;
      this.ocultandoId = null;
      this.actualizarVista();
    }
  }

  async cancelarCita(cita: Reserva): Promise<void> {
    if (
      this.dialogoAbierto ||
      this.cancelandoId !== null
    ) {
      return;
    }

    if (!this.esCancelable(cita)) {
      this.errorAccion = 'CITAS.ERROR_NO_CANCELABLE';
      this.actualizarVista();
      return;
    }

    this.dialogoAbierto = true;

    try {
      const alerta = await this.alertController.create({
        header: this.texto('CANCELAR_CITA'),
        message: this.texto('CANCELAR_CONFIRMACION'),
        backdropDismiss: false,
        buttons: [
          {
            text: this.texto('MANTENER_CITA'),
            role: 'cancel',
          },
          {
            text: this.texto('CONFIRMAR_CANCELAR'),
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
        this.errorAccion = 'CITAS.ERROR_PLAZO';
        this.actualizarVista();
        return;
      }

      this.cancelandoId = cita.id;
      this.mensajeAccion = '';
      this.errorAccion = '';
      this.actualizarVista();

      const reservaActualizada =
        await this.reservaService.cancelar(cita.id);

      if (this.destruida) {
        return;
      }

      this.citas = this.citas.map((item) =>
        item.id === cita.id
          ? reservaActualizada
          : item,
      );

      this.actualizarListado();
      this.mensajeAccion = 'CITAS.EXITO_CANCELAR';
    } catch (error: unknown) {
      if (!this.destruida) {
        this.errorAccion =
          this.claveErrorAccion(error, 'cancelar');

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
    if (
      !this.puedeResenar(cita) ||
      this.enviandoResena
    ) {
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
      this.errorAccion = 'CITAS.ERROR_COMENTARIO';
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
      this.mensajeAccion = 'CITAS.EXITO_RESENA';
    } catch (error: unknown) {
      if (!this.destruida) {
        this.errorAccion =
          this.claveErrorAccion(error, 'resena');

        if (
          error instanceof HttpErrorResponse &&
          (error.status === 400 || error.status === 409)
        ) {
          // Comprobamos el estado real en vez de asumir
          // que cualquier 400/409 implica una reseña publicada.
          await this.cargarResenasExistentes(
            this.versionCarga,
          );

          if (this.tieneResena(cita)) {
            this.reservaConResenaId = null;
            this.puntuacionResena = 0;
            this.comentarioResena = '';
            this.errorAccion =
              'CITAS.ERROR_RESENA_EXISTENTE';
          }
        }
      }
    } finally {
      this.enviandoResena = false;
      this.actualizarVista();
    }
  }

  claveEstado(
    estado: string | null | undefined,
  ): string {
    const normalizado = this.normalizarEstado(estado);

    return (
      this.etiquetasEstado[normalizado] ??
      'CITAS.ESTADO_DESCONOCIDO'
    );
  }

  claseEstado(
    estado: string | null | undefined,
  ): string {
    const normalizado = this.normalizarEstado(estado);

    return this.clasesEstado[normalizado] ?? 'unknown';
  }

  fechaFormateada(
    fecha: string | null | undefined,
  ): string {
    if (!fecha) {
      return this.texto('FECHA_NO_DISPONIBLE');
    }

    const fechaLocal = new Date(`${fecha}T12:00:00`);

    if (!Number.isFinite(fechaLocal.getTime())) {
      return this.texto('FECHA_NO_DISPONIBLE');
    }

    const locale = this.localeActual;
    let formato = this.formatosFecha.get(locale);

    if (!formato) {
      formato = new Intl.DateTimeFormat(locale, {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      });

      this.formatosFecha.set(locale, formato);
    }

    return formato.format(fechaLocal);
  }

  horaFormateada(
    hora: string | null | undefined,
  ): string {
    return hora
      ? hora.slice(0, 5)
      : this.texto('HORA_NO_DISPONIBLE');
  }

  precioFormateado(
    precio: number | string | null | undefined,
  ): string {
    if (
      precio === null ||
      precio === undefined ||
      precio === ''
    ) {
      return '';
    }

    const valor = Number(precio);

    if (!Number.isFinite(valor)) {
      return '';
    }

    const locale = this.localeActual;
    let formato = this.formatosPrecio.get(locale);

    if (!formato) {
      formato = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      this.formatosPrecio.set(locale, formato);
    }

    return formato.format(valor);
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

  private registrarTraducciones(): void {
    const idiomas = Object.keys(
      CITAS_TRADUCCIONES,
    ) as IdiomaApp[];

    for (const idioma of idiomas) {
      this.translate.setTranslation(
        idioma,
        {
          CITAS: CITAS_TRADUCCIONES[idioma],
        },
        true,
      );
    }
  }

  private texto(clave: string): string {
    return this.translate.instant(`CITAS.${clave}`);
  }

  private actualizarListado(): void {
    const citasDeEmpresa = this.empresaFiltroId
      ? this.citas.filter(
          (cita) =>
            cita.empresaId === this.empresaFiltroId,
        )
      : this.citas;

    this.nombreEmpresaFiltro = this.empresaFiltroId
      ? citasDeEmpresa[0]?.empresaNombre || ''
      : '';

    const proximas = citasDeEmpresa.filter(
      (cita) => this.esProxima(cita),
    );

    const historial = citasDeEmpresa.filter(
      (cita) => !this.esProxima(cita),
    );

    this.proximasCount = proximas.length;
    this.historialCount = historial.length;

    const origen =
      this.vista === 'proximas'
        ? proximas
        : this.vista === 'historial'
          ? historial
          : citasDeEmpresa;

    this.citasVisibles = [...origen].sort((a, b) => {
      const primera =
        `${a.fecha ?? ''}T${a.horaInicio ?? ''}`;

      const segunda =
        `${b.fecha ?? ''}T${b.horaInicio ?? ''}`;

      return this.vista === 'proximas'
        ? primera.localeCompare(segunda)
        : segunda.localeCompare(primera);
    });
  }

  private fechaHoraCita(cita: Reserva): number {
    if (!cita.fecha || !cita.horaInicio) {
      return Number.NaN;
    }

    return new Date(
      `${cita.fecha}T${cita.horaInicio}`,
    ).getTime();
  }

  private normalizarEstado(
    estado: string | null | undefined,
  ): string {
    return (estado ?? '')
      .trim()
      .toUpperCase()
      .replace(/[\s-]+/g, '_');
  }

  private esCargaActual(version: number): boolean {
    return (
      !this.destruida &&
      version === this.versionCarga
    );
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

  private async cargarResenasExistentes(
    versionCarga: number,
  ): Promise<void> {
    const empresasCompletadas = [
      ...new Set(
        this.citas
          .filter(
            (cita) =>
              this.esCompletada(cita) &&
              Boolean(cita.empresaId),
          )
          .map((cita) => cita.empresaId),
      ),
    ];

    this.reservasResenadas.clear();

    if (!empresasCompletadas.length) {
      this.cargandoResenas = false;
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
      // El backend sigue siendo quien impide duplicados.
    } finally {
      if (this.esCargaActual(versionCarga)) {
        this.cargandoResenas = false;
        this.actualizarVista();
      }
    }
  }

  private claveErrorAccion(
    error: unknown,
    accion: AccionCita,
  ): string {
    const genericos: Record<AccionCita, string> = {
      quitar: 'CITAS.ERROR_QUITAR',
      cancelar: 'CITAS.ERROR_CANCELAR',
      resena: 'CITAS.ERROR_RESENA',
    };

    const permisos: Record<AccionCita, string> = {
      quitar: 'CITAS.ERROR_PERMISO_QUITAR',
      cancelar: 'CITAS.ERROR_PERMISO_CANCELAR',
      resena: 'CITAS.ERROR_PERMISO_RESENA',
    };

    const conflictos: Record<AccionCita, string> = {
      quitar: 'CITAS.ERROR_CONFLICTO_QUITAR',
      cancelar: 'CITAS.ERROR_CONFLICTO_CANCELAR',
      resena: 'CITAS.ERROR_CONFLICTO_RESENA',
    };

    if (!(error instanceof HttpErrorResponse)) {
      return genericos[accion];
    }

    switch (error.status) {
      case 0:
        return 'CITAS.ERROR_CONEXION';

      case 401:
        return 'CITAS.ERROR_SESION';

      case 403:
        return permisos[accion];

      case 404:
        return 'CITAS.ERROR_NO_DISPONIBLE';

      case 409:
        return conflictos[accion];

      default:
        return genericos[accion];
    }
  }
}
