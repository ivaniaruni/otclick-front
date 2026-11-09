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
} from '../../../core/services/auth.service';

import {
  registrarTraduccionesAuth,
} from '../../../core/i18n/auth.traducciones';

import {
  SelectorIdiomaComponent,
} from '../../../shared/components/selector-idioma/selector-idioma.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
export class LoginPage {
  email = '';
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

  async onLogin(form: NgForm): Promise<void> {
    if (this.loading) {
      return;
    }

    this.error = '';

    if (form.invalid || !this.email.trim()) {
      form.control.markAllAsTouched();
      this.error = 'AUTH.ERROR_FORMULARIO';
      return;
    }

    this.loading = true;

    try {
      await this.authService.login(
        this.email.trim(),
        this.password,
      );

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
      return 'AUTH.ERROR_LOGIN';
    }

    switch (error.status) {
      case 0:
        return 'AUTH.ERROR_CONEXION';

      case 401:
        return 'AUTH.ERROR_CREDENCIALES';

      case 429:
        return 'AUTH.ERROR_DEMASIADOS_INTENTOS';

      default:
        return 'AUTH.ERROR_LOGIN';
    }
  }
}
