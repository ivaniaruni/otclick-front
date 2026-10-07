import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonSpinner,
  IonText
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  closeOutline,
  imageOutline,
  logOutOutline,
  saveOutline
} from 'ionicons/icons';
import { ArchivoService } from '../../core/services/archivo.service';
import { AuthService } from '../../core/services/auth.service';
import { UsuarioService } from '../../core/services/usuario.service';
import {
  ActualizarPerfilRequest,
  Usuario
} from '../../shared/models/usuario';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonButton,
    IonContent,
    IonIcon,
    IonInput,
    IonSpinner,
    IonText
  ]
})
export class PerfilPage implements OnInit, OnDestroy {
  perfil: Usuario | null = null;

  nombre = '';
  apellido = '';
  telefono = '';
  avatarUrl = '';

  archivoSeleccionado: File | null = null;
  vistaPreviaArchivo: string | null = null;

  cargando = true;
  guardando = false;
  cerrandoSesion = false;

  error = '';
  mensaje = '';

  constructor(
    private archivoService: ArchivoService,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) {
    addIcons({
      arrowBackOutline,
      closeOutline,
      imageOutline,
      logOutOutline,
      saveOutline
    });
  }

  ngOnInit(): void {
    void this.cargarPerfil();
  }

  ngOnDestroy(): void {
    this.liberarVistaPrevia();
  }

  get imagenMostrada(): string {
    return this.vistaPreviaArchivo || this.avatarUrl;
  }

  get iniciales(): string {
    const nombreInicial = this.nombre.trim().charAt(0);
    const apellidoInicial = this.apellido.trim().charAt(0);

    return `${nombreInicial}${apellidoInicial}`.toUpperCase() || '?';
  }

  get nombreCompleto(): string {
    return [this.nombre, this.apellido]
      .map((valor) => valor.trim())
      .filter(Boolean)
      .join(' ');
  }

  async cargarPerfil(): Promise<void> {
    this.cargando = true;
    this.error = '';
    this.mensaje = '';

    try {
      const perfil = await this.usuarioService.obtenerMiPerfil();

      this.perfil = perfil;
      this.nombre = perfil.nombre ?? '';
      this.apellido = perfil.apellido ?? '';
      this.telefono = perfil.telefono ?? '';
      this.avatarUrl = perfil.avatarUrl ?? '';
    } catch (error: any) {
      this.error =
        error?.error?.message ||
        'No hemos podido cargar tu perfil.';
    } finally {
      this.cargando = false;
    }
  }

  seleccionarArchivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0] ?? null;

    input.value = '';

    if (!archivo) {
      return;
    }

    this.error = '';
    this.mensaje = '';

    const errorArchivo = this.validarArchivo(archivo);

    if (errorArchivo) {
      this.error = errorArchivo;
      return;
    }

    this.liberarVistaPrevia();

    this.archivoSeleccionado = archivo;
    this.vistaPreviaArchivo = URL.createObjectURL(archivo);
  }

  quitarImagenSeleccionada(): void {
    this.liberarVistaPrevia();

    this.archivoSeleccionado = null;
    this.vistaPreviaArchivo = null;
  }

  async guardar(): Promise<void> {
    if (this.guardando || !this.nombre.trim()) {
      return;
    }

    this.error = '';
    this.mensaje = '';
    this.guardando = true;

    try {
      let avatarUrlFinal = this.normalizarOpcional(this.avatarUrl);

      if (this.archivoSeleccionado) {
        const respuesta = await this.archivoService.subirAvatar(
          this.archivoSeleccionado
        );

        avatarUrlFinal = this.construirUrlArchivo(respuesta.url);
      }

      const request: ActualizarPerfilRequest = {
        nombre: this.nombre.trim(),
        apellido: this.normalizarOpcional(this.apellido),
        telefono: this.normalizarOpcional(this.telefono),
        avatarUrl: avatarUrlFinal
      };

      const actualizado =
        await this.usuarioService.actualizarMiPerfil(request);

      this.perfil = actualizado;
      this.nombre = actualizado.nombre ?? '';
      this.apellido = actualizado.apellido ?? '';
      this.telefono = actualizado.telefono ?? '';
      this.avatarUrl = actualizado.avatarUrl ?? '';

      this.quitarImagenSeleccionada();

      await this.authService.updateStoredUser(actualizado);

      this.mensaje = 'Perfil actualizado correctamente.';
    } catch (error: any) {
      this.error =
        error?.error?.message ||
        'No hemos podido guardar los cambios.';
    } finally {
      this.guardando = false;
    }
  }

  async cerrarSesion(): Promise<void> {
    if (this.cerrandoSesion) {
      return;
    }

    this.cerrandoSesion = true;

    try {
      await this.authService.logout();
      window.location.href = '/login';
    } finally {
      this.cerrandoSesion = false;
    }
  }

  private validarArchivo(archivo: File): string | null {
    const tiposPermitidos = [
      'image/jpeg',
      'image/png',
      'image/webp'
    ];

    const maximoBytes = 5 * 1024 * 1024;

    if (!tiposPermitidos.includes(archivo.type)) {
      return 'Selecciona una imagen JPG, PNG o WEBP.';
    }

    if (archivo.size > maximoBytes) {
      return 'La imagen no puede superar 5 MB.';
    }

    return null;
  }

  private construirUrlArchivo(ruta: string): string {
    if (ruta.startsWith('http://') || ruta.startsWith('https://')) {
      return ruta;
    }

    const origenBackend = 'http://localhost:8090';

    return `${origenBackend}${ruta}`;
  }

  private liberarVistaPrevia(): void {
    if (this.vistaPreviaArchivo) {
      URL.revokeObjectURL(this.vistaPreviaArchivo);
    }
  }

  private normalizarOpcional(valor: string): string | null {
    const texto = valor.trim();

    return texto ? texto : null;
  }
}
