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
import { AuthService } from '../../../core/services/auth.service';

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
    IonText
  ]
})
export class LoginPage {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onLogin(): Promise<void> {
    if (this.loading) return;

    this.error = '';
    this.loading = true;

    try {
      await this.authService.login(this.email.trim(), this.password);
      await this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
    } catch (err: any) {
      this.error =
        err?.error?.message ||
        'No hemos podido iniciar sesión. Revisa tus datos.';
    } finally {
      this.loading = false;
    }
  }
}
