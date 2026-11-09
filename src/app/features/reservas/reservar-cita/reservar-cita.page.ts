import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink,
} from '@angular/router';

import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonSpinner,
  IonText,
} from '@ionic/angular/standalone';

import {
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  calendarOutline,
  checkmarkCircleOutline,
  chevronBackOutline,
  chevronForwardOutline,
} from 'ionicons/icons';

import {
  DisponibilidadDia,
  DisponibilidadService,
} from '../../../core/services/disponibilidad.service';

import {
  EmpresaService,
} from '../../../core/services/empresa.service';

import {
  ReservaService,
} from '../../../core/services/reserva.service';

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
  RESERVAR_CITA_TRADUCCIONES,
} from '../../../core/i18n/reservar-cita.traducciones';

import { Empresa } from '../../../shared/models/empresa';
import { Servicio } from '../../../shared/models/servicio';
import { Trabajador } from '../../../shared/models/trabajador';

interface DiaCalendario {
  fecha: string;
  numero: number;
  perteneceAlMes: boolean;
  pasado: boolean;
  fueraDeVentana: boolean;
  cargando: boolean;
  tieneDisponibilidad: boolean;
}

@Component({
  selector: 'app-reservar-cita',
  standalone: true,
  templateUrl: './reservar-cita.page.html',
  styleUrls: ['./reservar-cita.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonButton,
    IonContent,
    IonIcon,
    IonInput,
    IonSpinner,
    IonText,
    TranslatePipe,
  ],
})
export class ReservarCitaPage
  implements OnInit, OnDestroy {

  empresa: Empresa | null = null;
  servicios: Servicio[] = [];
  trabajadores: Trabajador[] = [];

  servicioSeleccionado: Servicio | null = null;
  trabajadorSeleccionado: Trabajador | null = null;

  fechaSeleccionada = '';
  disponibilidad: DisponibilidadDia | null = null;
  horaSeleccionada = '';

  notas = '';

  mesVisible = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
    12,
  );

  diasCalendario: DiaCalendario[] = [];
  fechasConDisponibilidad = new Set<string>();
  imagenesTrabajadorFallidas = new Set<string>();

  cargando = true;
  cargandoCalendario = false;
  cargandoSlots = false;
  confirmando = false;
  solicitudEnviada = false;

  error = '';
  errorSlots = '';
  mensaje = '';

  empresaId = '';

  private trabajadorIdInicial: string | null = null;
  private servicioIdInicial: string | null = null;

  private readonly maxDiasReserva = 60;
  private readonly consultasEnCurso = new Set<string>();

  private temporizadorNavegacion:
    ReturnType<typeof setTimeout> | null = null;

  private readonly locales: Record<IdiomaApp, string> = {
    es: 'es-ES',
    en: 'en-GB',
    fr: 'fr-FR',
    de: 'de-DE',
    ru: 'ru-RU',
    uk: 'uk-UA',
  };

  private readonly formatosFecha =
    new Map<string, Intl.DateTimeFormat>();

  private readonly formatosPrecio =
    new Map<string, Intl.NumberFormat>();

  private readonly etiquetasSemana =
    new Map<string, string[]>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService,
    private servicioService: ServicioService,
    private trabajadorService: TrabajadorService,
    private disponibilidadService: DisponibilidadService,
    private reservaService: ReservaService,
    private idioma: IdiomaService,
    private translate: TranslateService,
  ) {
    addIcons({
      arrowBackOutline,
      calendarOutline,
      checkmarkCircleOutline,
      chevronBackOutline,
      chevronForwardOutline,
    });

    this.registrarTraducciones();
  }

  ngOnInit(): void {
    this.empresaId =
      this.route.snapshot.paramMap.get('id') ?? '';

    this.trabajadorIdInicial =
      this.route.snapshot.queryParamMap.get(
        'trabajadorId',
      );

    this.servicioIdInicial =
      this.route.snapshot.queryParamMap.get(
        'servicioId',
      );

    if (!this.empresaId) {
      this.error = 'RESERVA.ERROR_SIN_EMPRESA';
      this.cargando = false;
      return;
    }

    void this.cargarDatos();
  }

  ngOnDestroy(): void {
    if (this.temporizadorNavegacion !== null) {
      clearTimeout(this.temporizadorNavegacion);
    }
  }

  private get localeActual(): string {
    return this.locales[this.idioma.actual()];
  }

  get tituloCalendario(): string {
    return this.obtenerFormatoFecha('mes').format(
      this.mesVisible,
    );
  }

  get diasSemana(): string[] {
    const locale = this.localeActual;
    const existentes = this.etiquetasSemana.get(locale);

    if (existentes) {
      return existentes;
    }

    const formato = new Intl.DateTimeFormat(locale, {
      weekday: 'short',
    });

    const etiquetas = Array.from(
      { length: 7 },
      (_, indice) =>
        formato.format(
          new Date(2024, 0, 1 + indice, 12),
        ),
    );

    this.etiquetasSemana.set(locale, etiquetas);

    return etiquetas;
  }

  get puedeIrAlMesAnterior(): boolean {
    const hoy = new Date();

    return (
      this.mesVisible.getFullYear() > hoy.getFullYear() ||
      (
        this.mesVisible.getFullYear() === hoy.getFullYear() &&
        this.mesVisible.getMonth() > hoy.getMonth()
      )
    );
  }

  get puedeIrAlMesSiguiente(): boolean {
    const ultimoDiaVisible = new Date(
      this.mesVisible.getFullYear(),
      this.mesVisible.getMonth() + 1,
      0,
      12,
    );

    return !this.esFechaPosteriorAlLimite(
      this.formatearFecha(ultimoDiaVisible),
    );
  }

  get trabajadoresFiltrados(): Trabajador[] {
    if (!this.servicioSeleccionado) {
      return this.trabajadores;
    }

    const ids =
      this.servicioSeleccionado.trabajadorIds ?? [];

    if (ids.length === 0) {
      return this.trabajadores;
    }

    return this.trabajadores.filter(
      (trabajador) => ids.includes(trabajador.id),
    );
  }

  get serviciosFiltrados(): Servicio[] {
    if (!this.trabajadorSeleccionado) {
      return this.servicios;
    }

    const trabajadorId = this.trabajadorSeleccionado.id;

    return this.servicios.filter((servicio) => {
      const ids = servicio.trabajadorIds ?? [];

      return (
        ids.length === 0 ||
        ids.includes(trabajadorId)
      );
    });
  }

  get puedeConfirmar(): boolean {
    return Boolean(
      this.empresa &&
      this.servicioSeleccionado &&
      this.trabajadorSeleccionado &&
      this.fechaSeleccionada &&
      this.horaSeleccionada &&
      !this.cargandoCalendario &&
      !this.cargandoSlots &&
      !this.confirmando &&
      !this.solicitudEnviada,
    );
  }

  marcarImagenTrabajadorFallida(
    trabajadorId: string,
  ): void {
    this.imagenesTrabajadorFallidas.add(trabajadorId);
  }

  async cargarDatos(): Promise<void> {
    this.cargando = true;
    this.error = '';

    try {
      const [empresa, servicios, trabajadores] =
        await Promise.all([
          this.empresaService.obtenerPorId(
            this.empresaId,
          ),
          this.servicioService.listarActivosPorEmpresa(
            this.empresaId,
          ),
          this.trabajadorService.listarActivosPorEmpresa(
            this.empresaId,
          ),
        ]);

      this.empresa = empresa;

      this.servicios = servicios.sort(
        (primero, segundo) =>
          primero.orden - segundo.orden,
      );

      this.trabajadores = trabajadores;

      if (this.servicioIdInicial) {
        this.servicioSeleccionado =
          this.servicios.find(
            (servicio) =>
              servicio.id === this.servicioIdInicial,
          ) ?? null;
      }

      if (this.trabajadorIdInicial) {
        this.trabajadorSeleccionado =
          this.trabajadores.find(
            (trabajador) =>
              trabajador.id === this.trabajadorIdInicial,
          ) ?? null;
      }

      this.aplicarSeleccionesAutomaticas();

      if (
        this.servicioSeleccionado &&
        this.trabajadorSeleccionado
      ) {
        await this.cargarDisponibilidadDelMes();
      } else {
        this.construirDiasCalendario();
      }
    } catch (error: unknown) {
      this.error = this.claveError(
        error,
        'RESERVA.ERROR_DATOS',
      );
    } finally {
      this.cargando = false;
    }
  }

  seleccionarServicio(servicio: Servicio): void {
    if (
      this.confirmando ||
      this.solicitudEnviada ||
      this.cargandoCalendario ||
      this.cargandoSlots
    ) {
      return;
    }

    this.servicioSeleccionado = servicio;
    this.limpiarSeleccionHorario();

    this.aplicarSeleccionesAutomaticas();
    this.construirDiasCalendario();

    if (
      this.servicioSeleccionado &&
      this.trabajadorSeleccionado
    ) {
      void this.cargarDisponibilidadDelMes();
    }
  }

  seleccionarTrabajador(
    trabajador: Trabajador,
  ): void {
    if (
      this.confirmando ||
      this.solicitudEnviada ||
      this.cargandoCalendario ||
      this.cargandoSlots
    ) {
      return;
    }

    this.trabajadorSeleccionado = trabajador;
    this.limpiarSeleccionHorario();

    this.aplicarSeleccionesAutomaticas();
    this.construirDiasCalendario();

    if (
      this.servicioSeleccionado &&
      this.trabajadorSeleccionado
    ) {
      void this.cargarDisponibilidadDelMes();
    }
  }

  async irMesAnterior(): Promise<void> {
    if (
      !this.puedeIrAlMesAnterior ||
      this.cargandoCalendario ||
      this.cargandoSlots ||
      this.confirmando ||
      this.solicitudEnviada
    ) {
      return;
    }

    this.mesVisible = new Date(
      this.mesVisible.getFullYear(),
      this.mesVisible.getMonth() - 1,
      1,
      12,
    );

    await this.cargarDisponibilidadDelMes();
  }

  async irMesSiguiente(): Promise<void> {
    if (
      !this.puedeIrAlMesSiguiente ||
      this.cargandoCalendario ||
      this.cargandoSlots ||
      this.confirmando ||
      this.solicitudEnviada
    ) {
      return;
    }

    this.mesVisible = new Date(
      this.mesVisible.getFullYear(),
      this.mesVisible.getMonth() + 1,
      1,
      12,
    );

    await this.cargarDisponibilidadDelMes();
  }

  async seleccionarFecha(fecha: string): Promise<void> {
    if (
      this.cargandoCalendario ||
      this.cargandoSlots ||
      this.confirmando ||
      this.solicitudEnviada
    ) {
      return;
    }

    const dia = this.diasCalendario.find(
      (item) => item.fecha === fecha,
    );

    if (
      !dia ||
      dia.pasado ||
      dia.fueraDeVentana ||
      dia.cargando ||
      !this.fechasConDisponibilidad.has(fecha)
    ) {
      return;
    }

    this.fechaSeleccionada = fecha;
    this.horaSeleccionada = '';
    this.disponibilidad = null;

    await this.cargarSlots(fecha);
  }

  seleccionarHora(horaInicio: string): void {
    if (
      this.confirmando ||
      this.solicitudEnviada ||
      this.cargandoCalendario ||
      this.cargandoSlots
    ) {
      return;
    }

    this.horaSeleccionada = horaInicio;
    this.error = '';
    this.mensaje = '';
  }

  async cargarDisponibilidadDelMes(): Promise<void> {
    this.construirDiasCalendario();

    if (
      !this.servicioSeleccionado ||
      !this.trabajadorSeleccionado
    ) {
      return;
    }

    this.cargandoCalendario = true;
    this.errorSlots = '';

    const fechas = this.diasCalendario
      .filter(
        (dia) =>
          dia.perteneceAlMes &&
          !dia.pasado &&
          !dia.fueraDeVentana,
      )
      .map((dia) => dia.fecha);

    try {
      await Promise.all(
        fechas.map((fecha) =>
          this.consultarDisponibilidadFecha(fecha),
        ),
      );

      this.construirDiasCalendario();

      const fechaActualDisponible =
        this.fechaSeleccionada !== '' &&
        this.fechasConDisponibilidad.has(
          this.fechaSeleccionada,
        );

      if (!fechaActualDisponible) {
        const primeraFechaDisponible = fechas.find(
          (fecha) =>
            this.fechasConDisponibilidad.has(fecha),
        );

        if (primeraFechaDisponible) {
          this.fechaSeleccionada =
            primeraFechaDisponible;

          await this.cargarSlots(
            primeraFechaDisponible,
          );
        } else {
          this.fechaSeleccionada = '';
          this.disponibilidad = null;
          this.horaSeleccionada = '';
        }

        return;
      }

      await this.cargarSlots(this.fechaSeleccionada);
    } finally {
      this.cargandoCalendario = false;
    }
  }

  async cargarSlots(fecha: string): Promise<void> {
    if (
      !this.servicioSeleccionado ||
      !this.trabajadorSeleccionado ||
      !fecha
    ) {
      return;
    }

    this.cargandoSlots = true;
    this.errorSlots = '';
    this.horaSeleccionada = '';

    try {
      this.disponibilidad =
        await this.disponibilidadService.obtenerSlots(
          this.trabajadorSeleccionado.id,
          this.servicioSeleccionado.id,
          fecha,
        );

      if (this.disponibilidad.slots.length === 0) {
        this.fechasConDisponibilidad.delete(fecha);
        this.construirDiasCalendario();

        const siguienteFecha =
          this.diasCalendario.find(
            (dia) =>
              dia.perteneceAlMes &&
              !dia.pasado &&
              !dia.fueraDeVentana &&
              this.fechasConDisponibilidad.has(
                dia.fecha,
              ),
          );

        if (
          siguienteFecha &&
          siguienteFecha.fecha !== fecha
        ) {
          this.fechaSeleccionada =
            siguienteFecha.fecha;

          await this.cargarSlots(
            siguienteFecha.fecha,
          );

          return;
        }

        this.fechaSeleccionada = '';
      }
    } catch (error: unknown) {
      this.disponibilidad = null;

      this.errorSlots = this.claveError(
        error,
        'RESERVA.ERROR_HORAS',
      );
    } finally {
      this.cargandoSlots = false;
    }
  }

  async confirmarReserva(): Promise<void> {
    if (
      !this.puedeConfirmar ||
      !this.empresa ||
      !this.servicioSeleccionado ||
      !this.trabajadorSeleccionado
    ) {
      return;
    }

    const slot = this.disponibilidad?.slots.find(
      (item) =>
        item.horaInicio === this.horaSeleccionada,
    );

    if (!slot) {
      this.error = 'RESERVA.ERROR_SELECCION_HORA';
      return;
    }

    this.confirmando = true;
    this.error = '';
    this.mensaje = '';

    try {
      await this.reservaService.crear({
        empresaId: this.empresa.id,
        trabajadorId: this.trabajadorSeleccionado.id,
        servicioId: this.servicioSeleccionado.id,
        fecha: this.fechaSeleccionada,
        horaInicio: slot.horaInicio,
        notas: this.notas.trim() || null,
      });

      this.solicitudEnviada = true;
      this.mensaje = 'RESERVA.EXITO';

      this.temporizadorNavegacion = setTimeout(() => {
        this.temporizadorNavegacion = null;
        void this.router.navigateByUrl('/tabs/citas');
      }, 1000);
    } catch (error: unknown) {
      this.error = this.claveError(
        error,
        'RESERVA.ERROR_CREAR',
      );

      if (
        error instanceof HttpErrorResponse &&
        error.status === 409
      ) {
        this.horaSeleccionada = '';

        if (this.fechaSeleccionada) {
          await this.cargarSlots(
            this.fechaSeleccionada,
          );
        }
      }
    } finally {
      this.confirmando = false;
    }
  }

  formatearHora(hora: string): string {
    return hora.slice(0, 5);
  }

  fechaLegible(fecha: string): string {
    if (!fecha) {
      return '';
    }

    const valor = new Date(`${fecha}T12:00:00`);

    if (!Number.isFinite(valor.getTime())) {
      return '';
    }

    return this.obtenerFormatoFecha('dia').format(
      valor,
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

  esFechaSeleccionada(fecha: string): boolean {
    return this.fechaSeleccionada === fecha;
  }

  private registrarTraducciones(): void {
    const idiomas = Object.keys(
      RESERVAR_CITA_TRADUCCIONES,
    ) as IdiomaApp[];

    for (const idioma of idiomas) {
      this.translate.setTranslation(
        idioma,
        {
          RESERVA: RESERVAR_CITA_TRADUCCIONES[idioma],
        },
        true,
      );
    }
  }

  private obtenerFormatoFecha(
    tipo: 'mes' | 'dia',
  ): Intl.DateTimeFormat {
    const locale = this.localeActual;
    const clave = `${locale}:${tipo}`;

    let formato = this.formatosFecha.get(clave);

    if (!formato) {
      const opciones: Intl.DateTimeFormatOptions =
        tipo === 'mes'
          ? {
              month: 'long',
              year: 'numeric',
            }
          : {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            };

      formato = new Intl.DateTimeFormat(
        locale,
        opciones,
      );

      this.formatosFecha.set(clave, formato);
    }

    return formato;
  }

  private limpiarSeleccionHorario(): void {
    this.horaSeleccionada = '';
    this.disponibilidad = null;
    this.fechaSeleccionada = '';
    this.errorSlots = '';
    this.error = '';
    this.mensaje = '';
    this.fechasConDisponibilidad.clear();
  }

  private aplicarSeleccionesAutomaticas(): void {
    if (
      !this.servicioSeleccionado &&
      this.servicios.length === 1
    ) {
      this.servicioSeleccionado = this.servicios[0];
    }

    const trabajadoresDisponibles =
      this.trabajadoresFiltrados;

    if (
      !this.trabajadorSeleccionado &&
      trabajadoresDisponibles.length === 1
    ) {
      this.trabajadorSeleccionado =
        trabajadoresDisponibles[0];
    }

    const serviciosDisponibles =
      this.serviciosFiltrados;

    if (
      !this.servicioSeleccionado &&
      serviciosDisponibles.length === 1
    ) {
      this.servicioSeleccionado =
        serviciosDisponibles[0];
    }
  }

  private async consultarDisponibilidadFecha(
    fecha: string,
  ): Promise<void> {
    if (
      !this.servicioSeleccionado ||
      !this.trabajadorSeleccionado ||
      this.consultasEnCurso.has(fecha)
    ) {
      return;
    }

    this.consultasEnCurso.add(fecha);

    this.actualizarDia(fecha, {
      cargando: true,
    });

    try {
      const resultado =
        await this.disponibilidadService.obtenerSlots(
          this.trabajadorSeleccionado.id,
          this.servicioSeleccionado.id,
          fecha,
        );

      if (resultado.slots.length > 0) {
        this.fechasConDisponibilidad.add(fecha);
      } else {
        this.fechasConDisponibilidad.delete(fecha);
      }
    } catch (error: unknown) {
      this.fechasConDisponibilidad.delete(fecha);

      this.errorSlots = this.claveError(
        error,
        'RESERVA.ERROR_HORAS',
      );
    } finally {
      this.consultasEnCurso.delete(fecha);

      this.actualizarDia(fecha, {
        cargando: false,
        tieneDisponibilidad:
          this.fechasConDisponibilidad.has(fecha),
      });
    }
  }

  private construirDiasCalendario(): void {
    const anio = this.mesVisible.getFullYear();
    const mes = this.mesVisible.getMonth();

    const primerDiaMes = new Date(
      anio,
      mes,
      1,
      12,
    );

    const desplazamientoLunes =
      (primerDiaMes.getDay() + 6) % 7;

    const inicioCuadricula = new Date(
      anio,
      mes,
      1 - desplazamientoLunes,
      12,
    );

    const hoy = this.formatearFecha(new Date());

    this.diasCalendario = Array.from(
      { length: 42 },
      (_, indice): DiaCalendario => {
        const fechaDate = new Date(
          inicioCuadricula,
        );

        fechaDate.setDate(
          inicioCuadricula.getDate() + indice,
        );

        const fecha = this.formatearFecha(fechaDate);

        return {
          fecha,
          numero: fechaDate.getDate(),
          perteneceAlMes:
            fechaDate.getMonth() === mes,
          pasado: fecha < hoy,
          fueraDeVentana:
            this.esFechaPosteriorAlLimite(fecha),
          cargando:
            this.consultasEnCurso.has(fecha),
          tieneDisponibilidad:
            this.fechasConDisponibilidad.has(fecha),
        };
      },
    );
  }

  private actualizarDia(
    fecha: string,
    cambios: Partial<DiaCalendario>,
  ): void {
    this.diasCalendario = this.diasCalendario.map(
      (dia) =>
        dia.fecha === fecha
          ? { ...dia, ...cambios }
          : dia,
    );
  }

  private esFechaPosteriorAlLimite(
    fecha: string,
  ): boolean {
    const limite = new Date();

    limite.setHours(12, 0, 0, 0);

    limite.setDate(
      limite.getDate() + this.maxDiasReserva,
    );

    return fecha > this.formatearFecha(limite);
  }

  private formatearFecha(fecha: Date): string {
    const anio = fecha.getFullYear();

    const mes = String(fecha.getMonth() + 1)
      .padStart(2, '0');

    const dia = String(fecha.getDate())
      .padStart(2, '0');

    return `${anio}-${mes}-${dia}`;
  }

  private claveError(
    error: unknown,
    claveGenerica: string,
  ): string {
    if (!(error instanceof HttpErrorResponse)) {
      return claveGenerica;
    }

    switch (error.status) {
      case 0:
        return 'RESERVA.ERROR_CONEXION';

      case 401:
        return 'RESERVA.ERROR_SESION';

      case 403:
        return 'RESERVA.ERROR_PERMISO';

      case 409:
        return 'RESERVA.ERROR_CONFLICTO';

      default:
        return claveGenerica;
    }
  }
}
