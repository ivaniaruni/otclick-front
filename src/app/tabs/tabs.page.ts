import { CommonModule } from '@angular/common';

import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

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

import { addIcons } from 'ionicons';

import {
  calendarOutline,
  chatbubblesOutline,
  homeOutline,
  storefrontOutline,
} from 'ionicons/icons';

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
  constructor(
    public pendientes: MensajesPendientesService,
    private translate: TranslateService,
  ) {
    addIcons({
      homeOutline,
      storefrontOutline,
      calendarOutline,
      chatbubblesOutline,
    });

    const textos: Record<string, string> = {
      es: 'Mensajes sin leer: {{cantidad}}',
      en: 'Unread messages: {{cantidad}}',
      fr: 'Messages non lus : {{cantidad}}',
      de: 'Ungelesene Nachrichten: {{cantidad}}',
      ru: 'Непрочитанные сообщения: {{cantidad}}',
      uk: 'Непрочитані повідомлення: {{cantidad}}',
    };

    for (const [idioma, texto] of Object.entries(textos)) {
      this.translate.setTranslation(
        idioma,
        {
          TAB_MENSAJES_PENDIENTES: texto,
        },
        true,
      );
    }
  }

  ngOnInit(): void {
    this.pendientes.iniciar();
  }

  ngOnDestroy(): void {
    this.pendientes.detener();
  }
}
