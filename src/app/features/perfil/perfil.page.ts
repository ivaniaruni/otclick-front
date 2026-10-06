import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  cameraOutline,
  logOutOutline,
  personCircleOutline,
  saveOutline
} from 'ionicons/icons';
import { AuthService } from '../../core/services/auth.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { Usuario } from '../../shared/models/usuario';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar
  ]
})
export class PerfilPage implements OnInit {
  perfil: Usuario | null = null;

  nombre = '';
  apellido = '';
  telefono = '';
  avatarUrl = '';

  cargando = true;
  guardando = false;
  cerrandoSesion = false;

  error = '';
  mensaje = '';

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({
      cameraOutline,
      logOutOutline,
      personCircleOutline,
      saveOutline
    });
  }

  ngOnInit(): void {
    void this.cargarPerfil();
  }

  get iniciales(): string {
    const nombre = this.nombre.trim().charAt(0);
    const apellido = this.apellido.trim().charAt(0);

    return `${nombre}${apellido}`.toUpperCase() || '?';
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

  async guardar(): Promise<void> {
    if (this.guardando || !this.nombre.trim()) {
      return;
    }

    this.error = '';
    this.mensaje = '';
    this.guardando = true;

    try {
      const actualizado = await this.usuarioService.actualizarMiPerfil({
        nombre: this.nombre.trim(),
        apellido: this.normalizarOpcional(this.apellido),
        telefono: this.normalizarOpcional(this.telefono),
        avatarUrl: this.normalizarOpcional(this.avatarUrl)
      });

      this.perfil = actualizado;
      this.nombre = actualizado.nombre ?? '';
      this.apellido = actualizado.apellido ?? '';
      this.telefono = actualizado.telefono ?? '';
      this.avatarUrl = actualizado.avatarUrl ?? '';

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

    await this.authService.logout();

    await this.router.navigateByUrl('/login', {
      replaceUrl: true
    });

    this.cerrandoSesion = false;
  }

  private normalizarOpcional(valor: string): string | null {
    const texto = valor.trim();
    return texto ? texto : null;
  }
}
