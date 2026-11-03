import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  IonIcon,
  IonPopover,
} from '@ionic/angular/standalone';

import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';

import {
  checkmarkOutline,
  globeOutline,
} from 'ionicons/icons';

import {
  IdiomaApp,
} from '../../../core/i18n/traducciones';

import {
  IdiomaService,
} from '../../../core/services/idioma.service';

@Component({
  selector: 'app-selector-idioma',
  standalone: true,
  templateUrl: './selector-idioma.component.html',
  styleUrls: ['./selector-idioma.component.scss'],
  imports: [
    CommonModule,
    IonIcon,
    IonPopover,
    TranslatePipe,
  ],
})
export class SelectorIdiomaComponent {
  abierto = false;
  evento: Event | undefined;
  error = false;

  constructor(
    public idioma: IdiomaService,
  ) {
    addIcons({
      globeOutline,
      checkmarkOutline,
    });
  }

  abrir(event: Event): void {
    this.evento = event;
    this.error = false;
    this.abierto = true;
  }

  cerrar(): void {
    this.abierto = false;
    this.evento = undefined;
  }

  async seleccionar(
    codigo: IdiomaApp,
  ): Promise<void> {
    if (this.idioma.cambiando()) {
      return;
    }

    this.error = false;

    try {
      await this.idioma.cambiar(codigo);
      this.abierto = false;
    } catch {
      this.error = true;
    }
  }
}
