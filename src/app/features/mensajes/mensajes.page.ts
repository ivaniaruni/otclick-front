import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  IonContent,
} from '@ionic/angular/standalone';

import { ApiService } from '../../core/services/api.service';
import { AuthResponse } from '../../core/services/auth.service';
import {
  Conversacion,
  ConversacionService,
  MensajeChat,
} from '../../core/services/conversacion.service';
import { ReservaService } from '../../core/services/reserva.service';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
  ],
})
export class MensajesPage
  implements AfterViewChecked, OnDestroy {

  @ViewChild('historial')
  private historial?: ElementRef<HTMLElement>;

  usuario: AuthResponse | null = null;
  conversaciones: Conversacion[] = [];
  seleccionada: Conversacion | null = null;
  mensajes: MensajeChat[] = [];

  texto = '';

  cargando = false;
  cargandoChat = false;
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

  private posicionPendiente: {
    alto: number;
    top: number;
  } | null = null;

  private readonly logosFallidos = new Set<string>();

  constructor(
    private api: ApiService,
    private chats: ConversacionService,
    private reservas: ReservaService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
  ) {}

  ionViewWillEnter(): void {
    this.visible = true;
    void this.cargar();
  }

  ionViewWillLeave(): void {
    this.visible = false;
    this.versionCarga++;
    this.versionChat++;
    this.bajarPendiente = false;
    this.posicionPendiente = null;
  }

  ngOnDestroy(): void {
    this.destruida = true;
    this.visible = false;
    this.versionCarga++;
    this.versionChat++;
  }

  ngAfterViewChecked(): void {
    const elemento = this.historial?.nativeElement;

    if (!elemento) {
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
        this.seleccionada = null;
        this.mensajes = [];
        this.cargandoChat = false;
      }
    } catch (error: unknown) {
      if (this.cargaActual(version)) {
        const mensaje = this.mensajeError(error);

        if (this.seleccionada) {
          this.errorChat = mensaje;
        } else {
          this.error = mensaje;
        }
      }
    } finally {
      if (this.cargaActual(version)) {
        this.cargando = false;
      }
    }
  }

  nombre(chat: Conversacion): string {
    const valor =
      chat.clienteId === this.usuario?.userId
        ? chat.empresaNombre
        : chat.clienteNombre;

    return valor?.trim() || 'Conversación';
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
      await this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          chatId: chat.id,
        },
        replaceUrl: true,
      });

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
      }
    }
  }

  async actualizarChat(): Promise<void> {
    const chat = this.seleccionada;

    if (
      !chat ||
      this.cargandoChat ||
      this.enviando ||
      this.gestionando
    ) {
      return;
    }

    const version = this.versionChat;
    const paginasCargadas = this.pagina;

    this.cargandoChat = true;
    this.errorChat = '';

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
      this.bajarPendiente = true;
    } catch (error: unknown) {
      if (this.chatActual(version, chat.id)) {
        this.errorChat = this.mensajeError(error);
      }
    } finally {
      if (this.chatActual(version, chat.id)) {
        this.cargandoChat = false;
      }
    }
  }

  async anteriores(): Promise<void> {
    const chat = this.seleccionada;

    if (
      !chat ||
      !this.hayMas ||
      this.cargandoChat ||
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
        this.mensajes.map(mensaje => mensaje.id),
      );

      this.mensajes = [
        ...historial.mensajes.filter(
          mensaje => !ids.has(mensaje.id),
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
        item => item.id === mensaje.id,
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
        .map(item =>
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
    } catch (error: unknown) {
      if (this.chatActual(version, chat.id)) {
        this.errorChat = this.mensajeError(error);
      }
    } finally {
      this.enviando = false;
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
      this.enviando
    ) {
      return;
    }

    const version = this.versionChat;

    this.gestionando = true;
    this.errorChat = '';

    try {
      let motivo = '';

      if (!aceptar) {
        const alerta =
          await this.alertController.create({
            header: 'Rechazar solicitud',
            message:
              'Puedes indicar un motivo para que el cliente sepa qué ha ocurrido.',
            inputs: [
              {
                name: 'motivo',
                type: 'textarea',
                placeholder: 'Motivo opcional',
                attributes: {
                  maxlength: 500,
                },
              },
            ],
            buttons: [
              {
                text: 'Volver',
                role: 'cancel',
              },
              {
                text: 'Rechazar',
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

      this.mensajes = this.mensajes.map(item =>
        item.reservaId === reserva.id
          ? {
              ...item,
              reservaEstado: reserva.estado,
              motivoCancelacion:
                reserva.motivoCancelacion ?? null,
            }
          : item,
      );
    } catch (error: unknown) {
      if (this.chatActual(version, chat.id)) {
        this.errorChat = this.mensajeError(error);
      }
    } finally {
      this.gestionando = false;
    }
  }

  estado(valor: string | null): string {
    const etiquetas: Record<string, string> = {
      PENDING: 'Pendiente de respuesta',
      CONFIRMED: 'Cita aceptada',
      CANCELLED: 'Cita cancelada',
      COMPLETED: 'Cita completada',
      NO_SHOW: 'No asistió',
    };

    return etiquetas[valor ?? ''] ??
      'Solicitud de cita';
  }

  async volver(): Promise<void> {
    if (this.enviando || this.gestionando) {
      return;
    }

    this.versionChat++;
    this.seleccionada = null;
    this.mensajes = [];
    this.texto = '';
    this.errorChat = '';
    this.cargandoChat = false;
    this.bajarPendiente = false;
    this.posicionPendiente = null;

    try {
      await this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
        replaceUrl: true,
      });

      await this.cargar();
    } catch (error: unknown) {
      if (this.visible && !this.destruida) {
        this.error = this.mensajeError(error);
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

  private mensajeError(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const body: unknown = error.error;

      if (body && typeof body === 'object') {
        const datos =
          body as Record<string, unknown>;

        for (const campo of ['message', 'detail']) {
          const mensaje = datos[campo];

          if (
            typeof mensaje === 'string' &&
            mensaje.trim()
          ) {
            return mensaje;
          }
        }
      }

      if (error.status === 0) {
        return 'No hay conexión con el servidor.';
      }

      if (error.status === 401) {
        return 'Tu sesión ha caducado. Vuelve a iniciar sesión.';
      }

      if (error.status === 403) {
        return 'No tienes permiso para acceder a esta conversación.';
      }
    }

    return 'No se ha podido completar la operación. Inténtalo de nuevo.';
  }
}
