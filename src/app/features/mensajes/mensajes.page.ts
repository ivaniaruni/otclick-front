import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  AlertController,
  IonContent,
} from '@ionic/angular/standalone';

import {
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

import { Subscription } from 'rxjs';

import { ApiService } from '../../core/services/api.service';

import {
  AuthResponse,
  AuthService,
} from '../../core/services/auth.service';

import {
  Conversacion,
  ConversacionService,
  MensajeChat,
} from '../../core/services/conversacion.service';

import {
  ReservaService,
} from '../../core/services/reserva.service';

import {
  UsuarioService,
} from '../../core/services/usuario.service';

import {
  IdiomaService,
} from '../../core/services/idioma.service';

import {
  MensajesPendientesService,
} from '../../core/services/mensajes-pendientes.service';

import {
  IdiomaApp,
} from '../../core/i18n/traducciones';

import {
  MENSAJES_TRADUCCIONES,
} from '../../core/i18n/mensajes.traducciones';

import {
  SelectorIdiomaComponent,
} from '../../shared/components/selector-idioma/selector-idioma.component';

type FormatoFechaChat = 'actividad' | 'mensaje' | 'reserva';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    TranslatePipe,
    SelectorIdiomaComponent,
  ],
})
export class MensajesPage
  implements AfterViewChecked, OnDestroy {

  @ViewChild('historial')
  private historial?: ElementRef<HTMLElement>;

  usuario: AuthResponse | null = null;
  avatarFallido = false;

  conversaciones: Conversacion[] = [];
  seleccionada: Conversacion | null = null;
  mensajes: MensajeChat[] = [];

  texto = '';

  cargando = false;
  cargandoChat = false;
  actualizandoChat = false;
  enviando = false;
  gestionando = false;

  error = '';
  errorChat = '';

  pagina = 0;
  hayMas = false;

  private versionChat = 0;
  private versionCarga = 0;

  private visible = false;
  private destruida = false;
  private bajarPendiente = false;
  private actualizandoLista = false;

  private leyendoMensajes = false;
  private reintentarLecturaDesde = 0;

  private temporizadorChat:
    ReturnType<typeof setInterval> | null = null;

  private temporizadorLectura:
    ReturnType<typeof setTimeout> | null = null;

  private posicionPendiente: {
    alto: number;
    top: number;
  } | null = null;

  private readonly logosFallidos = new Set<string>();
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

  private readonly estados: Record<string, string> = {
    PENDING: 'MENSAJES.ESTADO_PENDING',
    CONFIRMED: 'MENSAJES.ESTADO_CONFIRMED',
    CANCELLED: 'MENSAJES.ESTADO_CANCELLED',
    CANCELED: 'MENSAJES.ESTADO_CANCELLED',
    COMPLETED: 'MENSAJES.ESTADO_COMPLETED',
    NO_SHOW: 'MENSAJES.ESTADO_NO_SHOW',
    REJECTED: 'MENSAJES.ESTADO_REJECTED',
  };

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private chats: ConversacionService,
    private reservas: ReservaService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private translate: TranslateService,
    private idioma: IdiomaService,
    private changeDetector: ChangeDetectorRef,
    public pendientes: MensajesPendientesService,
  ) {
    this.registrarTraducciones();

    this.idiomaSubscription =
      this.translate.onLangChange.subscribe(() => {
        this.actualizarVista();
      });
  }

  ionViewWillEnter(): void {
    this.visible = true;
    this.iniciarActualizacionPeriodica();

    void this.cargar();
    void this.pendientes.actualizar();
  }

  ionViewWillLeave(): void {
    this.visible = false;

    this.versionCarga++;
    this.versionChat++;

    this.bajarPendiente = false;
    this.posicionPendiente = null;

    this.detenerActualizacionPeriodica();
    this.cancelarLecturaPendiente();
  }

  ngOnDestroy(): void {
    this.destruida = true;
    this.visible = false;

    this.versionCarga++;
    this.versionChat++;

    this.detenerActualizacionPeriodica();
    this.cancelarLecturaPendiente();

    this.idiomaSubscription.unsubscribe();
  }

  ngAfterViewChecked(): void {
    const elemento = this.historial?.nativeElement;

    if (!elemento || !this.visible) {
      return;
    }

    if (this.posicionPendiente) {
      elemento.scrollTop =
        this.posicionPendiente.top +
        elemento.scrollHeight -
        this.posicionPendiente.alto;

      this.posicionPendiente = null;
    }

    if (this.bajarPendiente) {
      elemento.scrollTop = elemento.scrollHeight;
      this.bajarPendiente = false;
    }

    this.programarLecturaVisible();
  }

  @HostListener('document:visibilitychange')
  alCambiarVisibilidad(): void {
    if (
      !this.visible ||
      this.destruida ||
      document.visibilityState !== 'visible'
    ) {
      return;
    }

    void this.pendientes.actualizar();

    if (this.seleccionada) {
      void this.actualizarChat(true);
    } else {
      void this.actualizarListaSilenciosa();
    }

    this.programarLecturaVisible();
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

  private get localeActual(): string {
    return this.locales[this.idioma.actual()];
  }

  marcarAvatarFallido(): void {
    this.avatarFallido = true;
  }

  cantidadPendientes(chat: Conversacion): number {
    const cantidad = Number(chat.mensajesNoLeidos);

    return Number.isFinite(cantidad)
      ? Math.max(0, Math.floor(cantidad))
      : 0;
  }

  etiquetaConversacion(chat: Conversacion): string {
    const abrir = this.translate.instant(
      'MENSAJES.ABRIR_CONVERSACION',
      { nombre: this.nombre(chat) },
    );

    const cantidad = this.cantidadPendientes(chat);

    if (!cantidad) {
      return abrir;
    }

    const pendientes = this.translate.instant(
      'MENSAJES.NO_LEIDOS',
      { cantidad },
    );

    return `${abrir}. ${pendientes}`;
  }

  async cargar(): Promise<void> {
    const version = ++this.versionCarga;

    this.cargando = true;
    this.error = '';

    try {
      const usuario = await this.api.get<AuthResponse>(
        '/auth/me',
      );

      if (!this.cargaActual(version)) {
        return;
      }

      this.usuario = usuario;
      this.avatarFallido = false;

      await this.actualizarPerfilCabecera(
        version,
        usuario,
      );

      if (!this.cargaActual(version)) {
        return;
      }

      const params = this.route.snapshot.queryParamMap;
      const reservaId = params.get('reservaId');
      const chatId = params.get('chatId');

      let destino: Conversacion | null = null;

      if (reservaId) {
        destino = await this.chats.abrirDesdeReserva(
          reservaId,
        );
      } else if (chatId) {
        destino = await this.chats.obtener(chatId);
      }

      if (!this.cargaActual(version)) {
        return;
      }

      const conversaciones = await this.chats.listar();

      if (!this.cargaActual(version)) {
        return;
      }

      this.conversaciones = conversaciones;

      if (destino) {
        await this.abrir(destino);
      } else {
        this.versionChat++;
        this.cancelarLecturaPendiente();

        this.seleccionada = null;
        this.mensajes = [];
        this.cargandoChat = false;
      }

      void this.pendientes.actualizar();
    } catch (error: unknown) {
      if (this.cargaActual(version)) {
        const clave = this.mensajeError(error);

        if (this.seleccionada) {
          this.errorChat = clave;
        } else {
          this.error = clave;
        }
      }
    } finally {
      if (this.cargaActual(version)) {
        this.cargando = false;
        this.actualizarVista();
      }
    }
  }

  private async actualizarPerfilCabecera(
    version: number,
    usuarioApi: AuthResponse,
  ): Promise<void> {
    try {
      const usuarioLocal =
        await this.authService.getCurrentUser();

      if (!this.cargaActual(version)) {
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
      // Se conserva la información de /auth/me.
    }

    if (!this.cargaActual(version)) {
      return;
    }

    try {
      const perfil =
        await this.usuarioService.obtenerMiPerfil();

      if (!this.cargaActual(version)) {
        return;
      }

      if (perfil.id !== usuarioApi.userId) {
        return;
      }

      this.usuario = {
        ...usuarioApi,
        nombre: perfil.nombre,
        email: perfil.email,
        rol: perfil.rol,
        avatarUrl: perfil.avatarUrl,
      };

      this.avatarFallido = false;

      await this.authService.updateStoredUser(perfil);
    } catch {
      // El perfil no bloquea las conversaciones.
    }
  }

  nombre(chat: Conversacion): string {
    const valor =
      chat.clienteId === this.usuario?.userId
        ? chat.empresaNombre
        : chat.clienteNombre;

    return (
      valor?.trim() ||
      this.translate.instant('MENSAJES.CONVERSACION')
    );
  }

  logoChat(chat: Conversacion): string | null {
    const esChatConEmpresa =
      chat.clienteId === this.usuario?.userId;

    const url = chat.empresaLogoUrl?.trim();

    if (
      !esChatConEmpresa ||
      !url ||
      this.logosFallidos.has(url)
    ) {
      return null;
    }

    return url;
  }

  marcarLogoFallido(chat: Conversacion): void {
    const url = chat.empresaLogoUrl?.trim();

    if (url) {
      this.logosFallidos.add(url);
    }
  }

  async abrir(chat: Conversacion): Promise<void> {
    if (this.enviando || this.gestionando) {
      return;
    }

    const version = ++this.versionChat;

    this.cancelarLecturaPendiente();
    this.reintentarLecturaDesde = 0;

    this.seleccionada = chat;
    this.mensajes = [];
    this.texto = '';
    this.error = '';
    this.errorChat = '';

    this.cargandoChat = true;
    this.pagina = 0;
    this.hayMas = false;
    this.posicionPendiente = null;
    this.bajarPendiente = false;

    try {
      await this.router.navigate(
        ['/tabs/mensajes'],
        {
          queryParams: {
            chatId: chat.id,
          },
          queryParamsHandling: 'replace',
          replaceUrl: true,
        },
      );

      if (!this.chatActual(version, chat.id)) {
        return;
      }

      const historial = await this.chats.mensajes(
        chat.id,
      );

      if (!this.chatActual(version, chat.id)) {
        return;
      }

      this.mensajes = historial.mensajes;
      this.pagina = historial.pagina;
      this.hayMas = historial.hayMas;
      this.bajarPendiente = true;
    } catch (error: unknown) {
      if (this.chatActual(version, chat.id)) {
        this.errorChat = this.mensajeError(error);
      }
    } finally {
      if (this.chatActual(version, chat.id)) {
        this.cargandoChat = false;
        this.actualizarVista();
      }
    }
  }

  async actualizarChat(
    silenciosa = false,
  ): Promise<void> {
    const chat = this.seleccionada;

    if (
      !chat ||
      !this.visible ||
      document.visibilityState !== 'visible' ||
      this.cargandoChat ||
      this.actualizandoChat ||
      this.enviando ||
      this.gestionando ||
      this.leyendoMensajes
    ) {
      return;
    }

    const version = this.versionChat;
    const paginasCargadas = this.pagina;

    const elemento = this.historial?.nativeElement;

    const estabaAlFinal = !elemento ||
      (
        elemento.scrollHeight -
        elemento.scrollTop -
        elemento.clientHeight
      ) < 80;

    this.actualizandoChat = true;

    if (!silenciosa) {
      this.cargandoChat = true;
      this.errorChat = '';
    }

    try {
      const peticiones = [];

      for (
        let pagina = 0;
        pagina <= paginasCargadas;
        pagina++
      ) {
        peticiones.push(
          this.chats.mensajes(chat.id, pagina),
        );
      }

      const resultados = await Promise.all(peticiones);

      if (!this.chatActual(version, chat.id)) {
        return;
      }

      const mensajes: MensajeChat[] = [];
      const ids = new Set<string>();

      for (
        let indice = resultados.length - 1;
        indice >= 0;
        indice--
      ) {
        for (const mensaje of resultados[indice].mensajes) {
          if (!ids.has(mensaje.id)) {
            ids.add(mensaje.id);
            mensajes.push(mensaje);
          }
        }
      }

      this.mensajes = mensajes;
      this.hayMas =
        resultados[resultados.length - 1].hayMas;

      this.bajarPendiente = estabaAlFinal;
      this.errorChat = '';
    } catch (error: unknown) {
      if (
        this.chatActual(version, chat.id) &&
        !silenciosa
      ) {
        this.errorChat = this.mensajeError(error);
      }
    } finally {
      this.actualizandoChat = false;

      if (this.chatActual(version, chat.id)) {
        this.cargandoChat = false;
        this.actualizarVista();
      }
    }
  }

  async anteriores(): Promise<void> {
    const chat = this.seleccionada;

    if (
      !chat ||
      !this.hayMas ||
      this.cargandoChat ||
      this.actualizandoChat ||
      this.enviando ||
      this.gestionando
    ) {
      return;
    }

    const version = this.versionChat;

    this.cargandoChat = true;
    this.errorChat = '';

    try {
      const historial = await this.chats.mensajes(
        chat.id,
        this.pagina + 1,
      );

      if (!this.chatActual(version, chat.id)) {
        return;
      }

      const elemento = this.historial?.nativeElement;

      if (elemento) {
        this.posicionPendiente = {
          alto: elemento.scrollHeight,
          top: elemento.scrollTop,
        };
      }

      const ids = new Set(
        this.mensajes.map((mensaje) => mensaje.id),
      );

      this.mensajes = [
        ...historial.mensajes.filter(
          (mensaje) => !ids.has(mensaje.id),
        ),
        ...this.mensajes,
      ];

      this.pagina = historial.pagina;
      this.hayMas = historial.hayMas;
    } catch (error: unknown) {
      if (this.chatActual(version, chat.id)) {
        this.errorChat = this.mensajeError(error);
      }
    } finally {
      if (this.chatActual(version, chat.id)) {
        this.cargandoChat = false;
        this.actualizarVista();
      }
    }
  }

  async enviar(): Promise<void> {
    const chat = this.seleccionada;
    const contenido = this.texto.trim();

    if (
      !chat ||
      !contenido ||
      contenido.length > 2000 ||
      this.enviando ||
      this.cargandoChat ||
      this.actualizandoChat ||
      this.gestionando
    ) {
      return;
    }

    const version = this.versionChat;

    this.enviando = true;
    this.errorChat = '';

    try {
      const mensaje = await this.chats.enviar(
        chat.id,
        contenido,
      );

      if (!this.chatActual(version, chat.id)) {
        return;
      }

      const existe = this.mensajes.some(
        (item) => item.id === mensaje.id,
      );

      if (!existe) {
        this.mensajes = [
          ...this.mensajes,
          mensaje,
        ];
      }

      if (this.texto.trim() === contenido) {
        this.texto = '';
      }

      this.bajarPendiente = true;

      this.conversaciones = this.conversaciones
        .map((item) =>
          item.id === chat.id
            ? {
                ...item,
                ultimoMensaje: mensaje.contenido,
                ultimaActividad: mensaje.fechaCreacion,
              }
            : item,
        )
        .sort((a, b) =>
          b.ultimaActividad.localeCompare(
            a.ultimaActividad,
          ),
        );

      void this.pendientes.actualizar();
    } catch (error: unknown) {
      if (this.chatActual(version, chat.id)) {
        this.errorChat = this.mensajeError(error);
      }
    } finally {
      this.enviando = false;
      this.actualizarVista();
    }
  }

  async gestionar(
    mensaje: MensajeChat,
    aceptar: boolean,
  ): Promise<void> {
    const chat = this.seleccionada;
    const reservaId = mensaje.reservaId;

    if (
      !chat?.puedeGestionarReservas ||
      !reservaId ||
      mensaje.reservaEstado !== 'PENDING' ||
      this.gestionando ||
      this.cargandoChat ||
      this.actualizandoChat ||
      this.enviando
    ) {
      return;
    }

    const version = this.versionChat;

    this.gestionando = true;
    this.cancelarLecturaPendiente();
    this.errorChat = '';

    try {
      let motivo = '';

      if (!aceptar) {
        const alerta =
          await this.alertController.create({
            header: this.traducir('RECHAZAR_TITULO'),
            message: this.traducir('RECHAZAR_TEXTO'),
            inputs: [
              {
                name: 'motivo',
                type: 'textarea',
                placeholder:
                  this.traducir('MOTIVO_OPCIONAL'),
                attributes: {
                  maxlength: 500,
                  'aria-label':
                    this.traducir('MOTIVO_OPCIONAL'),
                },
              },
            ],
            buttons: [
              {
                text: this.traducir('VOLVER'),
                role: 'cancel',
              },
              {
                text: this.traducir('RECHAZAR'),
                role: 'confirm',
              },
            ],
          });

        await alerta.present();

        const resultado =
          await alerta.onDidDismiss();

        if (
          resultado.role !== 'confirm' ||
          !this.chatActual(version, chat.id)
        ) {
          return;
        }

        motivo = String(
          resultado.data?.values?.motivo ?? '',
        ).trim();
      }

      const reserva = aceptar
        ? await this.reservas.confirmar(reservaId)
        : await this.reservas.cancelarPorEmpresa(
            reservaId,
            motivo,
          );

      if (!this.chatActual(version, chat.id)) {
        return;
      }

      this.mensajes = this.mensajes.map((item) =>
        item.reservaId === reserva.id
          ? {
              ...item,
              reservaEstado: reserva.estado,
              motivoCancelacion:
                reserva.motivoCancelacion ?? null,
            }
          : item,
      );

      void this.pendientes.actualizar();
    } catch (error: unknown) {
      if (this.chatActual(version, chat.id)) {
        this.errorChat = this.mensajeError(error);
      }
    } finally {
      this.gestionando = false;
      this.actualizarVista();
    }
  }

  claveEstado(
    valor: string | null | undefined,
  ): string {
    const normalizado = (valor ?? '')
      .trim()
      .toUpperCase()
      .replace(/[\s-]+/g, '_');

    return (
      this.estados[normalizado] ??
      'MENSAJES.SOLICITUD'
    );
  }

  fechaActividad(
    valor: string | null | undefined,
  ): string {
    return this.formatearFecha(valor, 'actividad');
  }

  fechaMensaje(
    valor: string | null | undefined,
  ): string {
    return this.formatearFecha(valor, 'mensaje');
  }

  fechaReserva(
    valor: string | null | undefined,
  ): string {
    return this.formatearFecha(valor, 'reserva');
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

  async volver(): Promise<void> {
    if (this.enviando || this.gestionando) {
      return;
    }

    const version = ++this.versionCarga;

    this.versionChat++;
    this.cancelarLecturaPendiente();

    this.seleccionada = null;
    this.mensajes = [];
    this.texto = '';

    this.error = '';
    this.errorChat = '';

    this.cargando = true;
    this.cargandoChat = false;

    this.pagina = 0;
    this.hayMas = false;

    this.bajarPendiente = false;
    this.posicionPendiente = null;

    try {
      const navegacionCorrecta =
        await this.router.navigate(
          ['/tabs/mensajes'],
          {
            queryParams: {},
            queryParamsHandling: 'replace',
            replaceUrl: true,
          },
        );

      if (
        !navegacionCorrecta ||
        !this.cargaActual(version)
      ) {
        return;
      }

      const conversaciones = await this.chats.listar();

      if (!this.cargaActual(version)) {
        return;
      }

      this.conversaciones = conversaciones;
      void this.pendientes.actualizar();
    } catch (error: unknown) {
      if (this.cargaActual(version)) {
        this.error = this.mensajeError(error);
      }
    } finally {
      if (this.cargaActual(version)) {
        this.cargando = false;
        this.actualizarVista();
      }
    }
  }

  async abrirPerfil(): Promise<void> {
    await this.router.navigateByUrl('/tabs/perfil');
  }

  trackMensaje(
    _indice: number,
    mensaje: MensajeChat,
  ): string {
    return mensaje.id;
  }

  trackConversacion(
    _indice: number,
    chat: Conversacion,
  ): string {
    return chat.id;
  }

  programarLecturaVisible(): void {
    if (
      this.leyendoMensajes ||
      this.temporizadorLectura !== null ||
      Date.now() < this.reintentarLecturaDesde ||
      !this.idsRecibidosVisibles().length
    ) {
      return;
    }

    this.temporizadorLectura = setTimeout(() => {
      this.temporizadorLectura = null;
      void this.marcarVisiblesComoLeidos();
    }, 350);
  }

  private iniciarActualizacionPeriodica(): void {
    this.detenerActualizacionPeriodica();

    this.temporizadorChat = setInterval(() => {
      if (
        !this.visible ||
        this.destruida ||
        this.cargando ||
        document.visibilityState !== 'visible'
      ) {
        return;
      }

      if (this.seleccionada) {
        void this.actualizarChat(true);
      } else {
        void this.actualizarListaSilenciosa();
      }

      this.programarLecturaVisible();
    }, 5000);
  }

  private detenerActualizacionPeriodica(): void {
    if (this.temporizadorChat !== null) {
      clearInterval(this.temporizadorChat);
      this.temporizadorChat = null;
    }
  }

  private async actualizarListaSilenciosa(): Promise<void> {
    if (
      !this.visible ||
      this.destruida ||
      this.cargando ||
      this.seleccionada ||
      this.actualizandoLista ||
      document.visibilityState !== 'visible'
    ) {
      return;
    }

    const version = this.versionCarga;

    this.actualizandoLista = true;

    try {
      const conversaciones = await this.chats.listar();

      if (
        !this.cargaActual(version) ||
        this.seleccionada
      ) {
        return;
      }

      this.conversaciones = conversaciones;
      this.error = '';
      this.actualizarVista();
    } catch {
      // Se conserva la última lista válida.
    } finally {
      this.actualizandoLista = false;
    }
  }

  private idsRecibidosVisibles(): string[] {
    const elemento = this.historial?.nativeElement;
    const usuarioId = this.usuario?.userId;

    if (
      !elemento ||
      !usuarioId ||
      !this.seleccionada ||
      !this.visible ||
      this.destruida ||
      this.cargandoChat ||
      this.actualizandoChat ||
      this.gestionando ||
      document.visibilityState !== 'visible'
    ) {
      return [];
    }

    const pendientes = new Set(
      this.mensajes
        .filter(
          (mensaje) =>
            mensaje.remitenteId !== usuarioId &&
            mensaje.leido === false,
        )
        .map((mensaje) => mensaje.id),
    );

    if (!pendientes.size) {
      return [];
    }

    const area = elemento.getBoundingClientRect();
    const viewport = window.visualViewport;

    const inicioViewport = viewport?.offsetTop ?? 0;
    const finViewport = viewport
      ? inicioViewport + viewport.height
      : window.innerHeight;

    const limiteSuperior = Math.max(
      inicioViewport,
      area.top,
    );

    const limiteInferior = Math.min(
      finViewport,
      area.bottom,
    );

    if (limiteInferior <= limiteSuperior) {
      return [];
    }

    const ids: string[] = [];

    const nodos =
      elemento.querySelectorAll<HTMLElement>(
        '[data-mensaje-id]',
      );

    for (const nodo of Array.from(nodos)) {
      const id = nodo.dataset['mensajeId'];

      if (!id || !pendientes.has(id)) {
        continue;
      }

      const rectangulo = nodo.getBoundingClientRect();

      const altoVisible =
        Math.min(rectangulo.bottom, limiteInferior) -
        Math.max(rectangulo.top, limiteSuperior);

      const minimoVisible = Math.min(
        40,
        rectangulo.height,
      );

      if (
        rectangulo.height > 0 &&
        altoVisible >= minimoVisible
      ) {
        ids.push(id);
      }
    }

    return ids;
  }

  private cancelarLecturaPendiente(): void {
    if (this.temporizadorLectura !== null) {
      clearTimeout(this.temporizadorLectura);
      this.temporizadorLectura = null;
    }
  }

  private async marcarVisiblesComoLeidos(): Promise<void> {
    const chat = this.seleccionada;

    if (
      !chat ||
      this.leyendoMensajes ||
      !this.visible ||
      this.destruida
    ) {
      return;
    }

    const ids = this.idsRecibidosVisibles();

    if (!ids.length) {
      return;
    }

    const version = this.versionChat;
    this.leyendoMensajes = true;

    try {
      for (
        let inicio = 0;
        inicio < ids.length;
        inicio += 100
      ) {
        if (
          !this.chatActual(version, chat.id) ||
          document.visibilityState !== 'visible'
        ) {
          break;
        }

        const visiblesAhora =
          new Set(this.idsRecibidosVisibles());

        const lote = ids
          .slice(inicio, inicio + 100)
          .filter((id) => visiblesAhora.has(id));

        if (!lote.length) {
          continue;
        }

        const respuesta =
          await this.chats.marcarLeidos(
            chat.id,
            lote,
          );

        if (!this.chatActual(version, chat.id)) {
          break;
        }

        const idsMarcados = new Set(lote);

        this.mensajes = this.mensajes.map(
          (mensaje) =>
            idsMarcados.has(mensaje.id)
              ? { ...mensaje, leido: true }
              : mensaje,
        );

        this.conversaciones =
          this.conversaciones.map(
            (conversacion) =>
              conversacion.id === chat.id
                ? {
                    ...conversacion,
                    mensajesNoLeidos:
                      respuesta.mensajesNoLeidos,
                  }
                : conversacion,
          );

        if (this.seleccionada?.id === chat.id) {
          this.seleccionada = {
            ...this.seleccionada,
            mensajesNoLeidos:
              respuesta.mensajesNoLeidos,
          };
        }
      }

      this.reintentarLecturaDesde = 0;
    } catch {
      this.reintentarLecturaDesde =
        Date.now() + 5000;
    } finally {
      this.leyendoMensajes = false;

      void this.pendientes.actualizar();
      this.actualizarVista();
    }
  }

  private registrarTraducciones(): void {
    const noLeidos: Record<IdiomaApp, string> = {
      es: 'Mensajes sin leer: {{cantidad}}',
      en: 'Unread messages: {{cantidad}}',
      fr: 'Messages non lus : {{cantidad}}',
      de: 'Ungelesene Nachrichten: {{cantidad}}',
      ru: 'Непрочитанные сообщения: {{cantidad}}',
      uk: 'Непрочитані повідомлення: {{cantidad}}',
    };

    const idiomas = Object.keys(
      MENSAJES_TRADUCCIONES,
    ) as IdiomaApp[];

    for (const idioma of idiomas) {
      this.translate.setTranslation(
        idioma,
        {
          MENSAJES: {
            ...MENSAJES_TRADUCCIONES[idioma],
            NO_LEIDOS: noLeidos[idioma],
          },
        },
        true,
      );
    }
  }

  private traducir(clave: string): string {
    return this.translate.instant(
      `MENSAJES.${clave}`,
    );
  }

  private formatearFecha(
    valor: string | null | undefined,
    tipo: FormatoFechaChat,
  ): string {
    if (!valor) {
      return '';
    }

    const esFechaSinHora =
      /^\d{4}-\d{2}-\d{2}$/.test(valor);

    const fecha = new Date(
      esFechaSinHora
        ? `${valor}T12:00:00`
        : valor,
    );

    if (!Number.isFinite(fecha.getTime())) {
      return '';
    }

    const locale = this.localeActual;
    const clave = `${locale}:${tipo}`;

    let formato = this.formatosFecha.get(clave);

    if (!formato) {
      const opciones: Intl.DateTimeFormatOptions =
        tipo === 'actividad'
          ? {
              day: '2-digit',
              month: '2-digit',
            }
          : tipo === 'reserva'
            ? {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }
            : {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              };

      formato = new Intl.DateTimeFormat(
        locale,
        opciones,
      );

      this.formatosFecha.set(clave, formato);
    }

    return formato.format(fecha);
  }

  private cargaActual(version: number): boolean {
    return (
      !this.destruida &&
      this.visible &&
      version === this.versionCarga
    );
  }

  private chatActual(
    version: number,
    chatId: string,
  ): boolean {
    return (
      !this.destruida &&
      this.visible &&
      version === this.versionChat &&
      this.seleccionada?.id === chatId
    );
  }

  private actualizarVista(): void {
    if (!this.destruida) {
      this.changeDetector.markForCheck();
    }
  }

  private mensajeError(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
      return 'MENSAJES.ERROR_GENERICO';
    }

    switch (error.status) {
      case 0:
        return 'MENSAJES.ERROR_CONEXION';

      case 400:
      case 422:
        return 'MENSAJES.ERROR_VALIDACION';

      case 401:
        return 'MENSAJES.ERROR_SESION';

      case 403:
        return 'MENSAJES.ERROR_PERMISO';

      case 404:
        return 'MENSAJES.ERROR_NO_DISPONIBLE';

      case 409:
        return 'MENSAJES.ERROR_CONFLICTO';

      default:
        return 'MENSAJES.ERROR_GENERICO';
    }
  }
}
