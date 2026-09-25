import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonInput,
  IonSpinner,
  IonText
} from '@ionic/angular/standalone';
import {
  AuthService,
  RegisterRequest
} from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonButton,
    IonContent,
    IonInput,
    IonSpinner,
    IonText
  ]
})
export class RegisterPage {
  nombre = '';
  apellido = '';
  email = '';
  telefono = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onRegister(): Promise<void> {
    if (this.loading) return;

    this.error = '';
    this.loading = true;

    const request: RegisterRequest = {
      nombre: this.nombre.trim(),
      apellido: this.apellido.trim(),
      email: this.email.trim(),
      telefono: this.telefono.trim(),
      password: this.password,
      rol: 'CLIENTE'
    };

    try {
      await this.authService.register(request);
      await this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
    } catch (err: any) {
      this.error =
        err?.error?.message ||
        'No hemos podido crear la cuenta. Inténtalo de nuevo.';
    } finally {
      this.loading = false;
    }
  }
}
