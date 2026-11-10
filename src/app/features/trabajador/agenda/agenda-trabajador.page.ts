import { CommonModule } from '@angular/common';

import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';

import { Router } from '@angular/router';

import {
  IonContent,
} from '@ionic/angular/standalone';

import {
  TranslatePipe,
} from '@ngx-translate/core';

import {
  AuthResponse,
  AuthService,
} from '../../../core/services/auth.service';

import {
  SelectorIdiomaComponent,
} from '../../../shared/components/selector-idioma/selector-idioma.component';

@Component({
  selector: 'app-agenda-trabajador',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    TranslatePipe,
    SelectorIdiomaComponent,
  ],
  styleUrls: ['../trabajador-base.scss'],
  template: `
    <ion-content>
      <main>
        <section
          class="welcome-band"
          aria-labelledby="agenda-trabajador-title"
        >
          <div class="content-width">
            <div class="top-row">
              <img
                class="logo"
                src="assets/otclick-logo.jpg"
                alt="OtClick"
                width="72"
                height="72"
              >

              <div class="header-actions">
                <app-selector-idioma></app-selector-idioma>

                <button
                  class="profile-access"
                  type="button"
                  (click)="abrirPerfil()"
                  [attr.aria-label]="
                    'PERFIL_ABRIR' | translate
                  "
                >
                  <span class="profile-copy">
                    <small>
                      {{ 'SALUDO' | translate }}{{ usuario?.nombre ? ',' : '' }}
                    </small>

                    <strong>
                      {{
                        usuario?.nombre ||
                        ('PERFIL_NOMBRE' | translate)
                      }}
                    </strong>
                  </span>

                  <span
                    class="profile-avatar"
                    [class.has-photo]="
                      fotoPerfil && !avatarFallido
                    "
                    [attr.data-profile-role]="usuario?.rol"
                    aria-hidden="true"
                  >
                    <img
                      *ngIf="
                        fotoPerfil && !avatarFallido;
                        else inicialAvatar
                      "
                      [src]="fotoPerfil"
                      alt=""
                      (error)="marcarAvatarFallido()"
                    >

                    <ng-template #inicialAvatar>
                      {{ inicialPerfil }}
                    </ng-template>
                  </span>
                </button>
              </div>
            </div>

            <div class="welcome-layout">
              <div>
                <p class="eyebrow">
                  {{ 'CITAS.EYEBROW' | translate }}
                </p>

                <h1 id="agenda-trabajador-title">
                  {{ 'TRABAJADOR_CITAS_TITULO' | translate }}
                </h1>

                <p class="intro">
                  {{
                    'TRABAJADOR_CITAS_PREPARACION'
                      | translate
                  }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="workspace-band">
          <div class="content-width">
            <div class="workspace-state">
              <span
                class="workspace-symbol"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24">
                  <rect
                    x="4"
                    y="5"
                    width="16"
                    height="16"
                    rx="3"
                  ></rect>

                  <path d="M8 3V7M16 3V7M4 11H20"></path>
                  <path d="M8 15H10M14 15H16M8 18H10"></path>
                </svg>
              </span>

              <p>
                {{
                  'TRABAJADOR_EN_PREPARACION'
                    | translate
                }}
              </p>
            </div>
          </div>
        </section>
      </main>
    </ion-content>
  `,
})
export class AgendaTrabajadorPage
  implements OnDestroy {

  usuario: AuthResponse | null = null;
  avatarFallido = false;

  private versionCarga = 0;
  private destruida = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ionViewWillEnter(): void {
    void this.cargarUsuario();
  }

  ionViewWillLeave(): void {
    this.versionCarga++;
  }

  ngOnDestroy(): void {
    this.destruida = true;
    this.versionCarga++;
  }

  get fotoPerfil(): string {
    return this.usuario?.avatarUrl?.trim() ?? '';
  }

  get inicialPerfil(): string {
    return (
      this.usuario?.nombre
        ?.trim()
        .charAt(0)
        .toUpperCase() ||
      '?'
    );
  }

  marcarAvatarFallido(): void {
    this.avatarFallido = true;
  }

  async abrirPerfil(): Promise<void> {
    await this.router.navigateByUrl('/tabs/perfil');
  }

  private async cargarUsuario(): Promise<void> {
    const version = ++this.versionCarga;

    try {
      const usuario = await this.auth.getCurrentUser();

      if (
        this.destruida ||
        version !== this.versionCarga
      ) {
        return;
      }

      this.usuario = usuario;
      this.avatarFallido = false;
    } catch {
      if (
        !this.destruida &&
        version === this.versionCarga
      ) {
        this.usuario = null;
      }
    } finally {
      if (
        !this.destruida &&
        version === this.versionCarga
      ) {
        this.changeDetector.markForCheck();
      }
    }
  }
}
