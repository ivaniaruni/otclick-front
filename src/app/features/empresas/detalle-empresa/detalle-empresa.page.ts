import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
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
  mailOutline
} from 'ionicons/icons';

import { EmpresaService } from '../../../core/services/empresa.service';
import { FotoTrabajoService } from '../../../core/services/foto-trabajo.service';
import { ServicioService } from '../../../core/services/servicio.service';
import { TrabajadorService } from '../../../core/services/trabajador.service';

import { Empresa } from '../../../shared/models/empresa';
import { FotoTrabajo } from '../../../shared/models/foto-trabajo';
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
  @ViewChild('galeria') galeria?: ElementRef<HTMLElement>;

  empresa: Empresa | null = null;
  trabajadores: Trabajador[] = [];
  servicios: Servicio[] = [];
  fotos: FotoTrabajo[] = [];

  fotoAbierta: FotoTrabajo | null = null;
  servicioAbiertoId: string | null = null;

  cargandoEmpresa = true;
  cargandoTrabajadores = false;
  cargandoServicios = false;
  cargandoFotos = false;

  errorEmpresa = '';
  errorTrabajadores = '';
  errorServicios = '';
  errorFotos = '';

  constructor(
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private trabajadorService: TrabajadorService,
    private servicioService: ServicioService,
    private fotoTrabajoService: FotoTrabajoService
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
      mailOutline
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
    const elemento = this.galeria?.nativeElement;
    if (!elemento) return;

    elemento.scrollBy({
      left: direccion * elemento.clientWidth * 0.8,
      behavior: 'smooth'
    });
  }

  abrirFoto(foto: FotoTrabajo): void {
    this.fotoAbierta = foto;
  }

  cerrarFoto(): void {
    this.fotoAbierta = null;
  }

  moverFoto(direccion: -1 | 1): void {
    if (!this.fotoAbierta || this.fotos.length < 2) return;

    const indice = this.fotos.findIndex(
      (foto) => foto.id === this.fotoAbierta?.id
    );

    const siguiente =
      (indice + direccion + this.fotos.length) % this.fotos.length;

    this.fotoAbierta = this.fotos[siguiente];
  }

  private async cargarDetalle(id: string): Promise<void> {
    this.cargandoEmpresa = true;
    this.errorEmpresa = '';
    this.errorTrabajadores = '';
    this.errorServicios = '';
    this.errorFotos = '';

    this.empresa = null;
    this.trabajadores = [];
    this.servicios = [];
    this.fotos = [];
    this.fotoAbierta = null;
    this.servicioAbiertoId = null;

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

    await Promise.all([
      this.cargarTrabajadores(id),
      this.cargarServicios(id),
      this.cargarFotos(id)
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
      const servicios: Servicio[] =
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
}
