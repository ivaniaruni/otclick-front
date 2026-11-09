import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterLink,
} from '@angular/router';

import {
  IonContent,
  IonIcon,
  IonModal,
} from '@ionic/angular/standalone';

import {
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  calendarOutline,
  callOutline,
  chevronBackOutline,
  chevronForwardOutline,
  closeOutline,
  locationOutline,
  logoInstagram,
  mailOutline,
  star,
  starOutline,
} from 'ionicons/icons';

import {
  EmpresaService,
} from '../../../core/services/empresa.service';

import {
  FotoTrabajoService,
} from '../../../core/services/foto-trabajo.service';

import {
  ResenaService,
} from '../../../core/services/resena.service';

import {
  ServicioService,
} from '../../../core/services/servicio.service';

import {
  TrabajadorService,
} from '../../../core/services/trabajador.service';

import {
  IdiomaService,
} from '../../../core/services/idioma.service';

import {
  IdiomaApp,
} from '../../../core/i18n/traducciones';

import {
  DETALLE_EMPRESA_TRADUCCIONES,
} from '../../../core/i18n/detalle-empresa.traducciones';

import { Empresa } from '../../../shared/models/empresa';
import { FotoTrabajo } from '../../../shared/models/foto-trabajo';

import {
  Resena,
  ResumenResenas,
} from '../../../shared/models/resena';

import { Servicio } from '../../../shared/models/servicio';
import { Trabajador } from '../../../shared/models/trabajador';

type TrabajadorConFoto = Trabajador & {
  fotoUrl?: string | null;
  avatarUrl?: string | null;
};

@Component({
  selector: 'app-detalle-empresa',
  standalone: true,
  templateUrl: './detalle-empresa.page.html',
  styleUrls: ['./detalle-empresa.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonIcon,
    IonModal,
    TranslatePipe,
  ],
})
export class DetalleEmpresaPage implements OnInit {
  empresa: Empresa | null = null;
  trabajadores: Trabajador[] = [];
  servicios: Servicio[] = [];
  fotos: FotoTrabajo[] = [];
  resenas: Resena[] = [];
  resumenResenas: ResumenResenas | null = null;

  fotoAbierta: FotoTrabajo | null = null;
  servicioAbiertoId: string | null = null;

  indiceGaleria = 0;
  claveGaleria = 0;

  cargandoEmpresa = true;
  cargandoTrabajadores = false;
  cargandoServicios = false;
  cargandoFotos = false;
  cargandoResenas = false;

  errorEmpresa = '';
  errorTrabajadores = '';
  errorServicios = '';
  errorFotos = '';
  errorResenas = '';

  private readonly locales: Record<IdiomaApp, string> = {
    es: 'es-ES',
    en: 'en-GB',
    fr: 'fr-FR',
    de: 'de-DE',
    ru: 'ru-RU',
    uk: 'uk-UA',
  };

  private readonly formatosPrecio =
    new Map<string, Intl.NumberFormat>();

  private readonly formatosValoracion =
    new Map<string, Intl.NumberFormat>();

  private readonly formatosRelativos =
    new Map<string, Intl.RelativeTimeFormat>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService,
    private trabajadorService: TrabajadorService,
    private servicioService: ServicioService,
    private fotoTrabajoService: FotoTrabajoService,
    private resenaService: ResenaService,
    private idioma: IdiomaService,
    private translate: TranslateService,
  ) {
    addIcons({
      arrowBackOutline,
      calendarOutline,
      callOutline,
      chevronBackOutline,
      chevronForwardOutline,
      closeOutline,
      locationOutline,
      logoInstagram,
      mailOutline,
      star,
      starOutline,
    });

    this.registrarTraducciones();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorEmpresa = 'DETALLE.ERROR_SIN_EMPRESA';
      this.cargandoEmpresa = false;
      return;
    }

    void this.cargarDetalle(id);
  }

  private get localeActual(): string {
    return this.locales[this.idioma.actual()];
  }

  get instagramUrl(): string | null {
    return this.empresa?.slug === 'julia-nails'
      ? 'https://www.instagram.com/julia_nails_oviedo/'
      : null;
  }

  get tiktokUrl(): string | null {
    return this.empresa?.slug === 'julia-nails'
      ? 'https://www.tiktok.com/@julia_nails_oviedo'
      : null;
  }

  get ubicacionUrl(): string | null {
    const direccion = this.empresa?.direccion;

    return direccion
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`
      : null;
  }

  get telefonoUrl(): string | null {
    const telefono =
      this.empresa?.telefono?.replace(/[^\d+]/g, '');

    return telefono ? `tel:${telefono}` : null;
  }

  get fotosPorVista(): number {
    return window.innerWidth <= 600 ? 1 : 3;
  }

  get fotosVisibles(): FotoTrabajo[] {
    return this.fotos.slice(
      this.indiceGaleria,
      this.indiceGaleria + this.fotosPorVista,
    );
  }

  get puedeVerAnteriorGaleria(): boolean {
    return this.indiceGaleria > 0;
  }

  get puedeVerSiguienteGaleria(): boolean {
    return (
      this.indiceGaleria + this.fotosPorVista <
      this.fotos.length
    );
  }

  get resenasVisibles(): Resena[] {
    return this.resenas.slice(0, 3);
  }

  get tieneResenas(): boolean {
    return (
      (this.resumenResenas?.totalResenas ?? 0) > 0
    );
  }

  estrellasResena(_puntuacion: number): number[] {
    return [1, 2, 3, 4, 5];
  }

  fechaRelativa(fecha: string): string {
    const fechaResena = new Date(fecha);

    if (!Number.isFinite(fechaResena.getTime())) {
      return '';
    }

    const diferenciaDias = Math.max(
      0,
      Math.floor(
        (Date.now() - fechaResena.getTime()) /
        (1000 * 60 * 60 * 24),
      ),
    );

    const locale = this.localeActual;
    let formato = this.formatosRelativos.get(locale);

    if (!formato) {
      formato = new Intl.RelativeTimeFormat(locale, {
        numeric: 'auto',
      });

      this.formatosRelativos.set(locale, formato);
    }

    if (diferenciaDias === 0) {
      return formato.format(0, 'day');
    }

    if (diferenciaDias < 7) {
      return formato.format(-diferenciaDias, 'day');
    }

    if (diferenciaDias < 30) {
      return formato.format(
        -Math.floor(diferenciaDias / 7),
        'week',
      );
    }

    if (diferenciaDias < 365) {
      return formato.format(
        -Math.max(1, Math.floor(diferenciaDias / 30)),
        'month',
      );
    }

    return formato.format(
      -Math.floor(diferenciaDias / 365),
      'year',
    );
  }

  precioFormateado(
    precio: number | string | null | undefined,
  ): string {
    if (
      precio === null ||
      precio === undefined ||
      precio === ''
    ) {
      return '';
    }

    const valor = Number(precio);

    if (!Number.isFinite(valor)) {
      return '';
    }

    const locale = this.localeActual;
    let formato = this.formatosPrecio.get(locale);

    if (!formato) {
      formato = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      this.formatosPrecio.set(locale, formato);
    }

    return formato.format(valor);
  }

  valoracionFormateada(
    valor: number | string | null | undefined,
  ): string {
    if (
      valor === null ||
      valor === undefined ||
      valor === ''
    ) {
      return '';
    }

    const numero = Number(valor);

    if (!Number.isFinite(numero)) {
      return '';
    }

    const locale = this.localeActual;
    let formato = this.formatosValoracion.get(locale);

    if (!formato) {
      formato = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });

      this.formatosValoracion.set(locale, formato);
    }

    return formato.format(numero);
  }

  fotoTrabajador(
    trabajador: Trabajador,
  ): string | null {
    const conFoto = trabajador as TrabajadorConFoto;

    return conFoto.avatarUrl || conFoto.fotoUrl || null;
  }

  trabajadoresDeServicio(
    servicio: Servicio,
  ): Trabajador[] {
    const ids = servicio.trabajadorIds ?? [];

    return this.trabajadores.filter(
      (trabajador) => ids.includes(trabajador.id),
    );
  }

  alternarServicio(id: string): void {
    this.servicioAbiertoId =
      this.servicioAbiertoId === id ? null : id;
  }

  moverGaleria(direccion: -1 | 1): void {
    const salto = this.fotosPorVista;

    const ultimoIndice = Math.max(
      0,
      this.fotos.length - salto,
    );

    const nuevoIndice = Math.min(
      ultimoIndice,
      Math.max(
        0,
        this.indiceGaleria + direccion * salto,
      ),
    );

    if (nuevoIndice === this.indiceGaleria) {
      return;
    }

    this.indiceGaleria = nuevoIndice;
    this.claveGaleria += 1;
  }

  abrirFoto(foto: FotoTrabajo): void {
    this.fotoAbierta = foto;
  }

  cerrarFoto(): void {
    this.fotoAbierta = null;
  }

  moverFoto(direccion: -1 | 1): void {
    if (!this.fotoAbierta || this.fotos.length < 2) {
      return;
    }

    const indice = this.fotos.findIndex(
      (foto) => foto.id === this.fotoAbierta?.id,
    );

    const siguiente =
      (indice + direccion + this.fotos.length) %
      this.fotos.length;

    this.fotoAbierta = this.fotos[siguiente];
  }

  reservarServicio(servicio: Servicio): void {
    if (!this.empresa) {
      return;
    }

    void this.router.navigate(
      ['/tabs/empresas', this.empresa.id, 'reservar'],
      {
        queryParams: {
          servicioId: servicio.id,
        },
      },
    );
  }

  verCalendarioTrabajador(
    trabajador: Trabajador,
  ): void {
    if (!this.empresa) {
      return;
    }

    void this.router.navigate(
      ['/tabs/empresas', this.empresa.id, 'reservar'],
      {
        queryParams: {
          trabajadorId: trabajador.id,
        },
      },
    );
  }

  abrirCalendarioDeFoto(_foto: FotoTrabajo): void {
    // Se mantiene el comportamiento actual.
    // La navegación desde una foto sigue pendiente.
  }

  async irAResenar(): Promise<void> {
    if (!this.empresa) {
      return;
    }

    await this.router.navigate(['/tabs/citas'], {
      queryParams: {
        empresaId: this.empresa.id,
        vista: 'historial',
      },
    });
  }

  private registrarTraducciones(): void {
    const idiomas = Object.keys(
      DETALLE_EMPRESA_TRADUCCIONES,
    ) as IdiomaApp[];

    for (const idioma of idiomas) {
      this.translate.setTranslation(
        idioma,
        {
          DETALLE: DETALLE_EMPRESA_TRADUCCIONES[idioma],
        },
        true,
      );
    }
  }

  private async cargarDetalle(
    id: string,
  ): Promise<void> {
    this.cargandoEmpresa = true;

    this.errorEmpresa = '';
    this.errorTrabajadores = '';
    this.errorServicios = '';
    this.errorFotos = '';
    this.errorResenas = '';

    this.empresa = null;
    this.trabajadores = [];
    this.servicios = [];
    this.fotos = [];
    this.resenas = [];
    this.resumenResenas = null;

    this.fotoAbierta = null;
    this.servicioAbiertoId = null;
    this.indiceGaleria = 0;
    this.claveGaleria = 0;

    try {
      const empresa =
        await this.empresaService.obtenerPorId(id);

      if (!empresa.activa) {
        this.errorEmpresa =
          'DETALLE.ERROR_NO_DISPONIBLE';
        return;
      }

      this.empresa = empresa;
    } catch {
      this.errorEmpresa = 'DETALLE.ERROR_EMPRESA';
      return;
    } finally {
      this.cargandoEmpresa = false;
    }

    this.cargandoTrabajadores = true;
    this.cargandoServicios = true;
    this.cargandoFotos = true;
    this.cargandoResenas = true;

    await Promise.all([
      this.cargarTrabajadores(id),
      this.cargarServicios(id),
      this.cargarFotos(id),
      this.cargarResenas(id),
    ]);
  }

  private async cargarTrabajadores(
    empresaId: string,
  ): Promise<void> {
    try {
      this.trabajadores =
        await this.trabajadorService
          .listarActivosPorEmpresa(empresaId);
    } catch {
      this.errorTrabajadores = 'DETALLE.ERROR_EQUIPO';
    } finally {
      this.cargandoTrabajadores = false;
    }
  }

  private async cargarServicios(
    empresaId: string,
  ): Promise<void> {
    try {
      const servicios =
        await this.servicioService
          .listarActivosPorEmpresa(empresaId);

      this.servicios = servicios.sort(
        (primero, segundo) =>
          primero.orden - segundo.orden,
      );
    } catch {
      this.errorServicios = 'DETALLE.ERROR_SERVICIOS';
    } finally {
      this.cargandoServicios = false;
    }
  }

  private async cargarFotos(
    empresaId: string,
  ): Promise<void> {
    try {
      this.fotos =
        await this.fotoTrabajoService
          .listarPorEmpresa(empresaId);
    } catch {
      this.errorFotos = 'DETALLE.ERROR_TRABAJOS';
    } finally {
      this.cargandoFotos = false;
    }
  }

  private async cargarResenas(
    empresaId: string,
  ): Promise<void> {
    try {
      const [resenas, resumen] = await Promise.all([
        this.resenaService.listarPorEmpresa(empresaId),
        this.resenaService.obtenerResumen(empresaId),
      ]);

      this.resenas = resenas;
      this.resumenResenas = resumen;
    } catch {
      this.errorResenas = 'DETALLE.ERROR_OPINIONES';
    } finally {
      this.cargandoResenas = false;
    }
  }
}
