import { CommonModule } from '@angular/common';

import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import {
  FormsModule,
  NgForm,
} from '@angular/forms';

import { RouterLink } from '@angular/router';

import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonSpinner,
  IonText,
} from '@ionic/angular/standalone';

import {
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  closeOutline,
  imageOutline,
  logOutOutline,
  saveOutline,
} from 'ionicons/icons';

import {
  ArchivoService,
} from '../../core/services/archivo.service';

import {
  AuthService,
} from '../../core/services/auth.service';

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
  PERFIL_TRADUCCIONES,
} from '../../core/i18n/perfil.traducciones';

import {
  ActualizarPerfilRequest,
  Usuario,
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
    IonText,
    TranslatePipe,
  ],
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
    private authService: AuthService,
    private idioma: IdiomaService,
    private translate: TranslateService,
  ) {
    addIcons({
      arrowBackOutline,
      closeOutline,
      imageOutline,
      logOutOutline,
      saveOutline,
    });

    this.registrarTraducciones();
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
    const nombreInicial =
      this.nombre.trim().charAt(0);

    const apellidoInicial =
      this.apellido.trim().charAt(0);

    return (
      `${nombreInicial}${apellidoInicial}`.toUpperCase() ||
      '?'
    );
  }

  get nombreCompleto(): string {
    return [this.nombre, this.apellido]
      .map((valor) => valor.trim())
      .filter(Boolean)
      .join(' ');
  }

  get claseMarco(): string {
    const rol = String(this.perfil?.rol ?? '')
      .trim()
      .toUpperCase();

    const clases: Record<string, string> = {
      CLIENTE: 'frame-client',
      EMPRESARIO: 'frame-business',
      TRABAJADOR: 'frame-worker',
      ADMIN: 'frame-admin',
    };

    return clases[rol] ?? 'frame-default';
  }

  async cargarPerfil(): Promise<void> {
    this.cargando = true;
    this.error = '';
    this.mensaje = '';

    try {
      const perfil =
        await this.usuarioService.obtenerMiPerfil();

      this.perfil = perfil;
      this.nombre = perfil.nombre ?? '';
      this.apellido = perfil.apellido ?? '';
      this.telefono = perfil.telefono ?? '';
      this.avatarUrl = perfil.avatarUrl ?? '';
    } catch {
      this.error = 'PERFIL.ERROR_CARGAR';
    } finally {
      this.cargando = false;
    }
  }

  seleccionarArchivo(event: Event): void {
    if (this.guardando || this.cerrandoSesion) {
      return;
    }

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

    this.vistaPreviaArchivo =
      URL.createObjectURL(archivo);
  }

  quitarImagenSeleccionada(): void {
    this.liberarVistaPrevia();
    this.archivoSeleccionado = null;
  }

  async guardar(form: NgForm): Promise<void> {
    if (this.guardando || this.cerrandoSesion) {
      return;
    }

    this.error = '';
    this.mensaje = '';

    if (form.invalid || !this.nombre.trim()) {
      form.control.markAllAsTouched();
      this.error = 'PERFIL.ERROR_FORMULARIO';
      return;
    }

    this.guardando = true;

    try {
      let avatarUrlFinal =
        this.normalizarOpcional(this.avatarUrl);

      if (this.archivoSeleccionado) {
        const respuesta =
          await this.archivoService.subirAvatar(
            this.archivoSeleccionado,
          );

        avatarUrlFinal =
          this.construirUrlArchivo(respuesta.url);
      }

      const request: ActualizarPerfilRequest = {
        nombre: this.nombre.trim(),
        apellido:
          this.normalizarOpcional(this.apellido),
        telefono:
          this.normalizarOpcional(this.telefono),
        avatarUrl: avatarUrlFinal,
      };

      const actualizado =
        await this.usuarioService.actualizarMiPerfil(
          request,
        );

      this.perfil = actualizado;
      this.nombre = actualizado.nombre ?? '';
      this.apellido = actualizado.apellido ?? '';
      this.telefono = actualizado.telefono ?? '';
      this.avatarUrl = actualizado.avatarUrl ?? '';

      this.quitarImagenSeleccionada();

      await this.authService.updateStoredUser(
        actualizado,
      );

      this.mensaje = 'PERFIL.EXITO_GUARDAR';
    } catch {
      this.error = 'PERFIL.ERROR_GUARDAR';
    } finally {
      this.guardando = false;
    }
  }

  async cerrarSesion(): Promise<void> {
    if (this.cerrandoSesion || this.guardando) {
      return;
    }

    const idiomaElegido = this.idioma.actual();

    this.cerrandoSesion = true;
    this.error = '';

    try {
      await this.authService.logout();

      await this.idioma.cambiar(idiomaElegido);

      window.location.href = '/login';
    } catch {
      this.error = 'PERFIL.ERROR_SALIR';
    } finally {
      this.cerrandoSesion = false;
    }
  }

  private registrarTraducciones(): void {
    const idiomas = Object.keys(
      PERFIL_TRADUCCIONES,
    ) as IdiomaApp[];

    for (const idioma of idiomas) {
      this.translate.setTranslation(
        idioma,
        {
          PERFIL: PERFIL_TRADUCCIONES[idioma],
        },
        true,
      );
    }
  }

  private validarArchivo(
    archivo: File,
  ): string | null {
    const tiposPermitidos = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    const maximoBytes = 5 * 1024 * 1024;

    if (!tiposPermitidos.includes(archivo.type)) {
      return 'PERFIL.ERROR_TIPO_IMAGEN';
    }

    if (archivo.size > maximoBytes) {
      return 'PERFIL.ERROR_TAMANO_IMAGEN';
    }

    return null;
  }

  private construirUrlArchivo(ruta: string): string {
    if (
      ruta.startsWith('http://') ||
      ruta.startsWith('https://')
    ) {
      return ruta;
    }

    const origenBackend = 'http://localhost:8090';

    return `${origenBackend}${ruta}`;
  }

  private liberarVistaPrevia(): void {
    if (this.vistaPreviaArchivo) {
      URL.revokeObjectURL(this.vistaPreviaArchivo);
      this.vistaPreviaArchivo = null;
    }
  }

  private normalizarOpcional(
    valor: string,
  ): string | null {
    const texto = valor.trim();

    return texto ? texto : null;
  }
}
