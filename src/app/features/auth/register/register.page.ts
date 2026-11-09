import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';

import {
  FormsModule,
  NgForm,
} from '@angular/forms';

import {
  Router,
  RouterLink,
} from '@angular/router';

import {
  IonButton,
  IonContent,
  IonInput,
  IonSpinner,
  IonText,
} from '@ionic/angular/standalone';

import {
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

import {
  AuthService,
  RegisterRequest,
} from '../../../core/services/auth.service';

import {
  registrarTraduccionesAuth,
} from '../../../core/i18n/auth.traducciones';

import {
  SelectorIdiomaComponent,
} from '../../../shared/components/selector-idioma/selector-idioma.component';

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
    IonText,
    TranslatePipe,
    SelectorIdiomaComponent,
  ],
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
    private router: Router,
    private translate: TranslateService,
  ) {
    registrarTraduccionesAuth(this.translate);
  }

  async onRegister(form: NgForm): Promise<void> {
    if (this.loading) {
      return;
    }

    this.error = '';

    if (
      form.invalid ||
      !this.nombre.trim() ||
      !this.email.trim() ||
      this.password.length < 8
    ) {
      form.control.markAllAsTouched();
      this.error = 'AUTH.ERROR_FORMULARIO';
      return;
    }

    this.loading = true;

    const request: RegisterRequest = {
      nombre: this.nombre.trim(),
      apellido: this.apellido.trim(),
      email: this.email.trim(),
      telefono: this.telefono.trim(),
      password: this.password,
      rol: 'CLIENTE',
    };

    try {
      await this.authService.register(request);

      await this.router.navigateByUrl(
        '/tabs/home',
        {
          replaceUrl: true,
        },
      );
    } catch (error: unknown) {
      this.error = this.claveError(error);
    } finally {
      this.loading = false;
    }
  }

  private claveError(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
      return 'AUTH.ERROR_REGISTRO';
    }

    switch (error.status) {
      case 0:
        return 'AUTH.ERROR_CONEXION';

      case 429:
        return 'AUTH.ERROR_DEMASIADOS_INTENTOS';

      default:
        return 'AUTH.ERROR_REGISTRO';
    }
  }
}
