import { DOCUMENT } from '@angular/common';

import {
  computed,
  inject,
  Injectable,
  signal,
} from '@angular/core';

import { AuthService } from './auth.service';

import {
  Conversacion,
  ConversacionService,
} from './conversacion.service';

@Injectable({
  providedIn: 'root',
})
export class MensajesPendientesService {
  private readonly document = inject(DOCUMENT);
  private readonly auth = inject(AuthService);
  private readonly chats = inject(ConversacionService);

  private readonly conversacionesInternas =
    signal<Conversacion[]>([]);

  readonly conversaciones =
    this.conversacionesInternas.asReadonly();

  readonly total = computed(() =>
    this.conversacionesInternas().reduce(
      (suma, chat) =>
        suma + this.normalizarCantidad(
          chat.mensajesNoLeidos,
        ),
      0,
    ),
  );

  readonly etiqueta = computed(() =>
    this.total() > 99
      ? '99+'
      : String(this.total()),
  );

  private temporizador:
    ReturnType<typeof setInterval> | null = null;

  private activo = false;
  private version = 0;
  private peticionEnCurso = false;
  private repetirActualizacion = false;
  private usuarioId: string | null = null;

  private readonly alCambiarVisibilidad = (): void => {
    if (this.document.visibilityState === 'visible') {
      void this.actualizar();
    }
  };

  iniciar(): void {
    if (this.activo) {
      void this.actualizar();
      return;
    }

    this.activo = true;
    this.version++;
    this.usuarioId = null;
    this.conversacionesInternas.set([]);

    this.document.addEventListener(
      'visibilitychange',
      this.alCambiarVisibilidad,
    );

    void this.actualizar();

    this.temporizador = setInterval(() => {
      void this.actualizar();
    }, 5000);
  }

  detener(): void {
    this.activo = false;
    this.version++;

    if (this.temporizador !== null) {
      clearInterval(this.temporizador);
      this.temporizador = null;
    }

    this.document.removeEventListener(
      'visibilitychange',
      this.alCambiarVisibilidad,
    );

    this.repetirActualizacion = false;
    this.usuarioId = null;
    this.conversacionesInternas.set([]);
  }

  async actualizar(): Promise<void> {
    if (
      !this.activo ||
      this.document.visibilityState !== 'visible'
    ) {
      return;
    }

    if (this.peticionEnCurso) {
      this.repetirActualizacion = true;
      return;
    }

    this.peticionEnCurso = true;
    const version = this.version;

    try {
      const usuario = await this.auth.getCurrentUser();
      const token = await this.auth.getToken();

      if (!this.esVersionActual(version)) {
        return;
      }

      if (!usuario || !token) {
        this.usuarioId = null;
        this.conversacionesInternas.set([]);
        return;
      }

      if (this.usuarioId !== usuario.userId) {
        this.usuarioId = usuario.userId;
        this.conversacionesInternas.set([]);
      }

      const conversaciones = await this.chats.listar();

      const usuarioActual =
        await this.auth.getCurrentUser();

      const tokenActual = await this.auth.getToken();

      if (
        !this.esVersionActual(version) ||
        usuarioActual?.userId !== usuario.userId ||
        tokenActual !== token
      ) {
        return;
      }

      this.conversacionesInternas.set(
        conversaciones,
      );
    } catch {
      // Un fallo temporal no se interpreta como cero pendientes.
    } finally {
      this.peticionEnCurso = false;

      if (
        this.activo &&
        this.repetirActualizacion
      ) {
        this.repetirActualizacion = false;
        void this.actualizar();
      }
    }
  }

  private esVersionActual(version: number): boolean {
    return (
      this.activo &&
      version === this.version
    );
  }

  private normalizarCantidad(valor: number): number {
    const numero = Number(valor);

    return Number.isFinite(numero)
      ? Math.max(0, Math.floor(numero))
      : 0;
  }
}
