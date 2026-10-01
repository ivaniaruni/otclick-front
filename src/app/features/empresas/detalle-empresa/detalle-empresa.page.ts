import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  calendarOutline,
  callOutline,
  locationOutline,
  logoInstagram,
  mailOutline
} from 'ionicons/icons';

import { EmpresaService } from '../../../core/services/empresa.service';
import { ServicioService } from '../../../core/services/servicio.service';
import { TrabajadorService } from '../../../core/services/trabajador.service';

import { Empresa } from '../../../shared/models/empresa';
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
    IonIcon
  ]
})
export class DetalleEmpresaPage implements OnInit {
  empresa: Empresa | null = null;
  trabajadores: Trabajador[] = [];
  servicios: Servicio[] = [];

  cargandoEmpresa = true;
  cargandoTrabajadores = false;
  cargandoServicios = false;

  errorEmpresa = '';
  errorTrabajadores = '';
  errorServicios = '';

  constructor(
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private trabajadorService: TrabajadorService,
    private servicioService: ServicioService
  ) {
    addIcons({
      arrowBackOutline,
      calendarOutline,
      callOutline,
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
    return conFoto.fotoUrl || conFoto.avatarUrl || null;
  }

  private async cargarDetalle(id: string): Promise<void> {
    this.cargandoEmpresa = true;
    this.errorEmpresa = '';
    this.errorTrabajadores = '';
    this.errorServicios = '';

    this.empresa = null;
    this.trabajadores = [];
    this.servicios = [];

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

    await Promise.all([
      this.cargarTrabajadores(id),
      this.cargarServicios(id)
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
}
