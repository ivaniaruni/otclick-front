import { DOCUMENT } from '@angular/common';

import {
  Inject,
  Injectable,
  signal,
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

import {
  IdiomaApp,
  TRADUCCIONES,
} from '../i18n/traducciones';

export interface OpcionIdioma {
  codigo: IdiomaApp;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class IdiomaService {
  private readonly STORAGE_KEY = 'otclick_idioma';

  private readonly idiomaSeleccionado =
    signal<IdiomaApp>('es');

  readonly actual = this.idiomaSeleccionado.asReadonly();

  readonly cambiando = signal(false);

  readonly disponibles: readonly OpcionIdioma[] = [
    {
      codigo: 'es',
      nombre: 'Español',
    },
    {
      codigo: 'en',
      nombre: 'English',
    },
    {
      codigo: 'fr',
      nombre: 'Français',
    },
    {
      codigo: 'de',
      nombre: 'Deutsch',
    },
    {
      codigo: 'ru',
      nombre: 'Русский',
    },
    {
      codigo: 'uk',
      nombre: 'Українська',
    },
  ];

  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    for (const idioma of this.disponibles) {
      this.translate.setTranslation(
        idioma.codigo,
        TRADUCCIONES[idioma.codigo],
      );
    }
  }

  async inicializar(): Promise<void> {
    await firstValueFrom(
      this.translate.setFallbackLang('es'),
    );

    let idiomaInicial: IdiomaApp = 'es';

    try {
      const guardado = this.document.defaultView
        ?.localStorage.getItem(this.STORAGE_KEY);

      if (this.esIdiomaValido(guardado)) {
        idiomaInicial = guardado;
      }
    } catch {
      // Si el almacenamiento no está disponible, usamos español.
    }

    await this.cambiar(idiomaInicial, false);
  }

  async cambiar(
    idioma: IdiomaApp,
    guardar = true,
  ): Promise<void> {
    if (
      !this.esIdiomaValido(idioma) ||
      this.cambiando()
    ) {
      return;
    }

    this.cambiando.set(true);

    try {
      await firstValueFrom(
        this.translate.use(idioma),
      );

      this.idiomaSeleccionado.set(idioma);

      this.document.documentElement.lang = idioma;
      this.document.documentElement.dir = 'ltr';

      if (guardar) {
        try {
          this.document.defaultView?.localStorage.setItem(
            this.STORAGE_KEY,
            idioma,
          );
        } catch {
          // El idioma permanece activo aunque no pueda guardarse.
        }
      }
    } finally {
      this.cambiando.set(false);
    }
  }

  private esIdiomaValido(
    valor: unknown,
  ): valor is IdiomaApp {
    return this.disponibles.some(
      idioma => idioma.codigo === valor,
    );
  }
}
