import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonContent, IonIcon, IonModal } from '@ionic/angular/standalone';
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
  starOutline
} from 'ionicons/icons';

import { EmpresaService } from '../../../core/services/empresa.service';
import { FotoTrabajoService } from '../../../core/services/foto-trabajo.service';
import { ResenaService } from '../../../core/services/resena.service';
import { ServicioService } from '../../../core/services/servicio.service';
import { TrabajadorService } from '../../../core/services/trabajador.service';

import { Empresa } from '../../../shared/models/empresa';
import { FotoTrabajo } from '../../../shared/models/foto-trabajo';
import {
  Resena,
  ResumenResenas
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
    IonModal
  ]
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

  constructor(
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private trabajadorService: TrabajadorService,
    private servicioService: ServicioService,
    private fotoTrabajoService: FotoTrabajoService,
    private resenaService: ResenaService
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
      starOutline
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorEmpresa = 'No se ha indicado ninguna empresa.';
      this.cargandoEmpresa = false;
      return;
    }

    void this.cargarDetalle(id);
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
    const telefono = this.empresa?.telefono?.replace(/[^\d+]/g, '');
    return telefono ? `tel:${telefono}` : null;
  }

  get fotosPorVista(): number {
    return window.innerWidth <= 600 ? 1 : 3;
  }

  get fotosVisibles(): FotoTrabajo[] {
    return this.fotos.slice(
      this.indiceGaleria,
      this.indiceGaleria + this.fotosPorVista
    );
  }

  get puedeVerAnteriorGaleria(): boolean {
    return this.indiceGaleria > 0;
  }

  get puedeVerSiguienteGaleria(): boolean {
    return this.indiceGaleria + this.fotosPorVista < this.fotos.length;
  }

  get resenasVisibles(): Resena[] {
    return this.resenas.slice(0, 3);
  }

  get tieneResenas(): boolean {
    return (this.resumenResenas?.totalResenas ?? 0) > 0;
  }

  estrellasResena(puntuacion: number): number[] {
    return Array.from({ length: 5 }, (_, indice) => indice + 1);
  }

  fechaRelativa(fecha: string): string {
    const fechaResena = new Date(fecha);

    if (Number.isNaN(fechaResena.getTime())) {
      return '';
    }

    const hoy = new Date();
    const diferenciaMs = hoy.getTime() - fechaResena.getTime();
    const diferenciaDias = Math.floor(
      diferenciaMs / (1000 * 60 * 60 * 24)
    );

    if (diferenciaDias <= 0) return 'Hoy';
    if (diferenciaDias === 1) return 'Hace 1 día';
    if (diferenciaDias < 7) return `Hace ${diferenciaDias} días`;

    const diferenciaSemanas = Math.floor(diferenciaDias / 7);

    if (diferenciaSemanas === 1) return 'Hace 1 semana';
    if (diferenciaSemanas < 5) {
      return `Hace ${diferenciaSemanas} semanas`;
    }

    const diferenciaMeses = Math.floor(diferenciaDias / 30);

    if (diferenciaMeses === 1) return 'Hace 1 mes';
    return `Hace ${diferenciaMeses} meses`;
  }

  fotoTrabajador(trabajador: Trabajador): string | null {
    const conFoto = trabajador as TrabajadorConFoto;
    return conFoto.avatarUrl || conFoto.fotoUrl || null;
  }

  trabajadoresDeServicio(servicio: Servicio): Trabajador[] {
    const ids = servicio.trabajadorIds || [];

    return this.trabajadores.filter((trabajador) =>
      ids.includes(trabajador.id)
    );
  }

  alternarServicio(id: string): void {
    this.servicioAbiertoId = this.servicioAbiertoId === id
      ? null
      : id;
  }

  moverGaleria(direccion: -1 | 1): void {
    const salto = this.fotosPorVista;
    const ultimoIndice = Math.max(0, this.fotos.length - salto);
    const nuevoIndice = Math.min(
      ultimoIndice,
      Math.max(0, this.indiceGaleria + direccion * salto)
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
      (foto) => foto.id === this.fotoAbierta?.id
    );

    const siguiente =
      (indice + direccion + this.fotos.length) % this.fotos.length;

    this.fotoAbierta = this.fotos[siguiente];
  }

  abrirCalendarioDeServicio(_servicio: Servicio): void {
    // Se conectará cuando exista la ruta de calendario y reserva.
  }

  abrirCalendarioDeFoto(_foto: FotoTrabajo): void {
    // Se conectará cuando exista la ruta de calendario del trabajador.
  }

  private async cargarDetalle(id: string): Promise<void> {
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
      const empresa = await this.empresaService.obtenerPorId(id);

      if (!empresa.activa) {
        this.errorEmpresa = 'Esta empresa no está disponible.';
        return;
      }

      this.empresa = empresa;
    } catch {
      this.errorEmpresa = 'No hemos podido cargar esta empresa.';
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
      this.cargarResenas(id)
    ]);
  }

  private async cargarTrabajadores(id: string): Promise<void> {
    try {
      this.trabajadores =
        await this.trabajadorService.listarActivosPorEmpresa(id);
    } catch {
      this.errorTrabajadores = 'No hemos podido cargar el equipo.';
    } finally {
      this.cargandoTrabajadores = false;
    }
  }

  private async cargarServicios(id: string): Promise<void> {
    try {
      const servicios =
        await this.servicioService.listarActivosPorEmpresa(id);

      this.servicios = servicios.sort(
        (a: Servicio, b: Servicio) => a.orden - b.orden
      );
    } catch {
      this.errorServicios = 'No hemos podido cargar los servicios.';
    } finally {
      this.cargandoServicios = false;
    }
  }

  private async cargarFotos(id: string): Promise<void> {
    try {
      this.fotos = await this.fotoTrabajoService.listarPorEmpresa(id);
    } catch {
      this.errorFotos = 'No hemos podido cargar los trabajos realizados.';
    } finally {
      this.cargandoFotos = false;
    }
  }

  private async cargarResenas(id: string): Promise<void> {
    try {
      const [resenas, resumen] = await Promise.all([
        this.resenaService.listarPorEmpresa(id),
        this.resenaService.obtenerResumen(id)
      ]);

      this.resenas = resenas;
      this.resumenResenas = resumen;
    } catch {
      this.errorResenas = 'No hemos podido cargar las opiniones.';
    } finally {
      this.cargandoResenas = false;
    }
  }
}
