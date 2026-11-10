import { CommonModule } from '@angular/common';

import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import {
  NavigationEnd,
  Router,
} from '@angular/router';

import {
  IonBadge,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';

import {
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { addIcons } from 'ionicons';

import {
  calendarOutline,
  chatbubblesOutline,
  homeOutline,
  storefrontOutline,
} from 'ionicons/icons';

import {
  AuthResponse,
  AuthService,
} from '../../app/core/services/auth.service';

import {
  MensajesPendientesService,
} from '../../app/core/services/mensajes-pendientes.service';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  imports: [
    CommonModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonBadge,
    TranslatePipe,
  ],
})
export class TabsPage implements OnInit, OnDestroy {
  usuario: AuthResponse | null = null;

  private navegacionSubscription?: Subscription;
  private destruida = false;
  private versionUsuario = 0;

  constructor(
    public pendientes: MensajesPendientesService,
    private translate: TranslateService,
    private auth: AuthService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) {
    addIcons({
      homeOutline,
      storefrontOutline,
      calendarOutline,
      chatbubblesOutline,
    });

    this.registrarTraducciones();
  }

  ngOnInit(): void {
    void this.actualizarUsuario();

    this.pendientes.iniciar();

    this.navegacionSubscription =
      this.router.events
        .pipe(
          filter(
            (evento) => evento instanceof NavigationEnd,
          ),
        )
        .subscribe(() => {
          void this.actualizarUsuario();
        });
  }

  ngOnDestroy(): void {
    this.destruida = true;
    this.versionUsuario++;

    this.navegacionSubscription?.unsubscribe();
    this.pendientes.detener();
  }

  get esTrabajador(): boolean {
    return this.usuario?.rol === 'TRABAJADOR';
  }

  private async actualizarUsuario(): Promise<void> {
    const version = ++this.versionUsuario;

    try {
      const usuario = await this.auth.getCurrentUser();

      if (
        this.destruida ||
        version !== this.versionUsuario
      ) {
        return;
      }

      this.usuario = usuario;
      this.changeDetector.markForCheck();
    } catch {
      if (
        !this.destruida &&
        version === this.versionUsuario
      ) {
        this.usuario = null;
        this.changeDetector.markForCheck();
      }
    }
  }

  private registrarTraducciones(): void {
    const textos: Record<
      string,
      Record<string, string>
    > = {
      es: {
        TAB_MENSAJES_PENDIENTES:
          'Mensajes sin leer: {{cantidad}}',
        TAB_EMPRESA_TRABAJADOR:
          'Empresa',
        TRABAJADOR_EMPRESA_TITULO:
          'Mi empresa',
        TRABAJADOR_EMPRESA_PREPARACION:
          'Aquí conectaremos tu empresa, tus servicios, tu horario y las solicitudes de cambios o ausencias.',
        TRABAJADOR_CITAS_TITULO:
          'Mis citas',
        TRABAJADOR_CITAS_PREPARACION:
          'Aquí conectaremos tu agenda profesional y las citas que tengas asignadas.',
        TRABAJADOR_EN_PREPARACION:
          'Espacio de trabajo en preparación',
      },

      en: {
        TAB_MENSAJES_PENDIENTES:
          'Unread messages: {{cantidad}}',
        TAB_EMPRESA_TRABAJADOR:
          'Company',
        TRABAJADOR_EMPRESA_TITULO:
          'My company',
        TRABAJADOR_EMPRESA_PREPARACION:
          'Your company, services, working hours and requests for schedule changes or time off will be connected here.',
        TRABAJADOR_CITAS_TITULO:
          'My appointments',
        TRABAJADOR_CITAS_PREPARACION:
          'Your professional schedule and assigned appointments will be connected here.',
        TRABAJADOR_EN_PREPARACION:
          'Workspace in preparation',
      },

      fr: {
        TAB_MENSAJES_PENDIENTES:
          'Messages non lus : {{cantidad}}',
        TAB_EMPRESA_TRABAJADOR:
          'Entreprise',
        TRABAJADOR_EMPRESA_TITULO:
          'Mon entreprise',
        TRABAJADOR_EMPRESA_PREPARACION:
          'Votre entreprise, vos services, vos horaires et vos demandes de modification ou d’absence seront disponibles ici.',
        TRABAJADOR_CITAS_TITULO:
          'Mes rendez-vous',
        TRABAJADOR_CITAS_PREPARACION:
          'Votre agenda professionnel et les rendez-vous qui vous sont attribués seront disponibles ici.',
        TRABAJADOR_EN_PREPARACION:
          'Espace de travail en préparation',
      },

      de: {
        TAB_MENSAJES_PENDIENTES:
          'Ungelesene Nachrichten: {{cantidad}}',
        TAB_EMPRESA_TRABAJADOR:
          'Unternehmen',
        TRABAJADOR_EMPRESA_TITULO:
          'Mein Unternehmen',
        TRABAJADOR_EMPRESA_PREPARACION:
          'Hier werden Ihr Unternehmen, Ihre Dienstleistungen, Arbeitszeiten und Anträge auf Änderungen oder Abwesenheiten eingebunden.',
        TRABAJADOR_CITAS_TITULO:
          'Meine Termine',
        TRABAJADOR_CITAS_PREPARACION:
          'Hier werden Ihr beruflicher Kalender und Ihre zugewiesenen Termine eingebunden.',
        TRABAJADOR_EN_PREPARACION:
          'Arbeitsbereich in Vorbereitung',
      },

      ru: {
        TAB_MENSAJES_PENDIENTES:
          'Непрочитанные сообщения: {{cantidad}}',
        TAB_EMPRESA_TRABAJADOR:
          'Компания',
        TRABAJADOR_EMPRESA_TITULO:
          'Моя компания',
        TRABAJADOR_EMPRESA_PREPARACION:
          'Здесь будут доступны ваша компания, услуги, график работы и заявки на изменение графика или отсутствие.',
        TRABAJADOR_CITAS_TITULO:
          'Мои записи',
        TRABAJADOR_CITAS_PREPARACION:
          'Здесь будут доступны ваш рабочий календарь и назначенные вам записи.',
        TRABAJADOR_EN_PREPARACION:
          'Рабочий раздел в разработке',
      },

      uk: {
        TAB_MENSAJES_PENDIENTES:
          'Непрочитані повідомлення: {{cantidad}}',
        TAB_EMPRESA_TRABAJADOR:
          'Компанія',
        TRABAJADOR_EMPRESA_TITULO:
          'Моя компанія',
        TRABAJADOR_EMPRESA_PREPARACION:
          'Тут будуть доступні ваша компанія, послуги, робочий графік і заявки на зміну графіка або відсутність.',
        TRABAJADOR_CITAS_TITULO:
          'Мої записи',
        TRABAJADOR_CITAS_PREPARACION:
          'Тут будуть доступні ваш робочий календар і призначені вам записи.',
        TRABAJADOR_EN_PREPARACION:
          'Робочий розділ у розробці',
      },
    };

    for (
      const [idioma, traducciones]
      of Object.entries(textos)
    ) {
      this.translate.setTranslation(
        idioma,
        traducciones,
        true,
      );
    }
  }
}
