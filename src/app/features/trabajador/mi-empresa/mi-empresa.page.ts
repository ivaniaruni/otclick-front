import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';

import { Router } from '@angular/router';

import { IonContent } from '@ionic/angular/standalone';

import {
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

import {
  AuthResponse,
  AuthService,
} from '../../../core/services/auth.service';

import {
  IdiomaService,
} from '../../../core/services/idioma.service';

import {
  DiaHorarioTrabajador,
  EspacioTrabajador,
  SemanaHorarioTrabajador,
  ServicioDelTrabajador,
  TrabajadorEspacioService,
} from '../../../core/services/trabajador-espacio.service';

import {
  IdiomaApp,
} from '../../../core/i18n/traducciones';

import {
  TRABAJADOR_EMPRESA_TRADUCCIONES,
} from '../../../core/i18n/trabajador-empresa.traducciones';

import {
  SelectorIdiomaComponent,
} from '../../../shared/components/selector-idioma/selector-idioma.component';

@Component({
  selector: 'app-mi-empresa-trabajador',
  standalone: true,
  templateUrl: './mi-empresa.page.html',
  styleUrls: [
    '../trabajador-base.scss',
    './mi-empresa.page.scss',
  ],
  imports: [
    CommonModule,
    IonContent,
    TranslatePipe,
    SelectorIdiomaComponent,
  ],
})
export class MiEmpresaTrabajadorPage implements OnDestroy {
  usuario: AuthResponse | null = null;

  espacio: EspacioTrabajador | null = null;
  horario: SemanaHorarioTrabajador | null = null;

  cargando = true;
  error = '';

  avatarFallido = false;
  logoFallido = false;

  private versionCarga = 0;
  private visible = false;
  private destruida = false;

  private fechaSolicitada?: string;

  private readonly locales: Record<IdiomaApp, string> = {
    es: 'es-ES',
    en: 'en-GB',
    fr: 'fr-FR',
    de: 'de-DE',
    ru: 'ru-RU',
    uk: 'uk-UA',
  };

  constructor(
    private auth: AuthService,
    private servicio: TrabajadorEspacioService,
    private idioma: IdiomaService,
    private translate: TranslateService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) {
    for (
      const idioma of Object.keys(
        TRABAJADOR_EMPRESA_TRADUCCIONES,
      ) as IdiomaApp[]
    ) {
      this.translate.setTranslation(
        idioma,
        {
          TRABAJADOR_EMPRESA:
            TRABAJADOR_EMPRESA_TRADUCCIONES[idioma],
        },
        true,
      );
    }
  }

  ionViewWillEnter(): void {
    this.visible = true;
    void this.cargar();
  }

  ionViewWillLeave(): void {
    this.visible = false;
    this.versionCarga++;
  }

  ngOnDestroy(): void {
    this.destruida = true;
    this.visible = false;
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

  get inicialEmpresa(): string {
    return (
      this.espacio?.empresa?.nombre
        ?.trim()
        .charAt(0)
        .toUpperCase() ||
      '?'
    );
  }

  private get localeActual(): string {
    return this.locales[this.idioma.actual()];
  }

  async cargar(): Promise<void> {
    const version = ++this.versionCarga;

    this.cargando = true;
    this.error = '';

    try {
      const usuario = await this.auth.getCurrentUser();

      if (!this.cargaActual(version)) {
        return;
      }

      this.usuario = usuario;
      this.avatarFallido = false;

      const [espacio, horario] = await Promise.all([
        this.servicio.obtenerEspacio(),
        this.servicio.obtenerHorario(
          this.fechaSolicitada,
        ),
      ]);

      if (!this.cargaActual(version)) {
        return;
      }

      if (espacio.estado !== horario.estado) {
        throw new Error(
          'La vinculación ha cambiado durante la consulta.',
        );
      }

      this.espacio = espacio;
      this.horario = horario;
      this.fechaSolicitada = horario.fechaInicio;
      this.logoFallido = false;
    } catch (error: unknown) {
      if (this.cargaActual(version)) {
        this.error =
          error instanceof HttpErrorResponse &&
          error.status === 401
            ? 'MENSAJES.ERROR_SESION'
            : 'TRABAJADOR_EMPRESA.ERROR';
      }
    } finally {
      if (this.cargaActual(version)) {
        this.cargando = false;
        this.changeDetector.markForCheck();
      }
    }
  }

  cambiarSemana(desplazamiento: number): void {
    if (this.cargando || !this.horario) {
      return;
    }

    const fecha = this.convertirFecha(
      this.horario.fechaInicio,
    );

    if (!fecha) {
      return;
    }

    fecha.setDate(
      fecha.getDate() + desplazamiento * 7,
    );

    this.fechaSolicitada = this.fechaISO(fecha);
    void this.cargar();
  }

  semanaActual(): void {
    if (this.cargando) {
      return;
    }

    this.fechaSolicitada = undefined;
    void this.cargar();
  }

  async abrirPerfil(): Promise<void> {
    await this.router.navigateByUrl('/tabs/perfil');
  }

  marcarAvatarFallido(): void {
    this.avatarFallido = true;
  }

  marcarLogoFallido(): void {
    this.logoFallido = true;
  }

  fechaCorta(valor: string): string {
    const fecha = this.convertirFecha(valor);

    return fecha
      ? new Intl.DateTimeFormat(
          this.localeActual,
          {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          },
        ).format(fecha)
      : '';
  }

  diaSemana(valor: string): string {
    const fecha = this.convertirFecha(valor);

    return fecha
      ? new Intl.DateTimeFormat(
          this.localeActual,
          { weekday: 'long' },
        ).format(fecha)
      : '';
  }

  fechaDia(valor: string): string {
    const fecha = this.convertirFecha(valor);

    return fecha
      ? new Intl.DateTimeFormat(
          this.localeActual,
          {
            day: 'numeric',
            month: 'short',
          },
        ).format(fecha)
      : '';
  }

  hora(valor: string): string {
    return valor.slice(0, 5);
  }

  precio(valor: number): string {
    return new Intl.NumberFormat(
      this.localeActual,
      {
        style: 'currency',
        currency: 'EUR',
      },
    ).format(valor);
  }

  telefonoHref(valor: string): string {
    return `tel:${valor.replace(/[^\d+]/g, '')}`;
  }

  horarioAjustado(dia: DiaHorarioTrabajador): boolean {
    const normalizar = (
      franjas: DiaHorarioTrabajador['horarioAsignado'],
    ): string =>
      franjas
        .map(
          (franja) =>
            `${this.hora(franja.horaInicio)}-${this.hora(franja.horaFin)}`,
        )
        .sort()
        .join('|');

    return (
      dia.horarioAsignado.length > 0 &&
      normalizar(dia.horarioAsignado) !==
        normalizar(dia.horarioEfectivo)
    );
  }

  trackDia(
    _indice: number,
    dia: DiaHorarioTrabajador,
  ): string {
    return dia.fecha;
  }

  trackServicio(
    indice: number,
    servicio: ServicioDelTrabajador,
  ): string | number {
    return servicio.id ?? indice;
  }

  private convertirFecha(valor: string): Date | null {
    const fecha = new Date(`${valor}T12:00:00`);

    return Number.isFinite(fecha.getTime())
      ? fecha
      : null;
  }

  private fechaISO(fecha: Date): string {
    const year = fecha.getFullYear();

    const mes = String(
      fecha.getMonth() + 1,
    ).padStart(2, '0');

    const dia = String(
      fecha.getDate(),
    ).padStart(2, '0');

    return `${year}-${mes}-${dia}`;
  }

  private cargaActual(version: number): boolean {
    return (
      this.visible &&
      !this.destruida &&
      version === this.versionCarga
    );
  }
}
