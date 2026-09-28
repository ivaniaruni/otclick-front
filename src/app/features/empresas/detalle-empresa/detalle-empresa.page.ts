import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

import { EmpresaService } from '../../../core/services/empresa.service';
import { ServicioService } from '../../../core/services/servicio.service';
import { TrabajadorService } from '../../../core/services/trabajador.service';

import { Empresa } from '../../../shared/models/empresa';
import { EmpresaGoogle } from '../../../shared/models/empresa-google';
import { Servicio } from '../../../shared/models/servicio';
import { Trabajador } from '../../../shared/models/trabajador';

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
  datosGoogle: EmpresaGoogle | null = null;
  trabajadores: Trabajador[] = [];
  servicios: Servicio[] = [];

  cargandoEmpresa = true;
  cargandoGoogle = false;
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
    addIcons({ arrowBackOutline });
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

  private async cargarDetalle(id: string): Promise<void> {
    this.cargandoEmpresa = true;
    this.errorEmpresa = '';
    this.errorTrabajadores = '';
    this.errorServicios = '';

    this.empresa = null;
    this.datosGoogle = null;
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

    try {
      this.trabajadores =
        await this.trabajadorService.listarActivosPorEmpresa(id);
    } catch {
      this.errorTrabajadores = 'No hemos podido cargar el equipo.';
    } finally {
      this.cargandoTrabajadores = false;
    }

    this.cargandoServicios = true;

    try {
      this.servicios = (
        await this.servicioService.listarActivosPorEmpresa(id)
      ).sort((a, b) => a.orden - b.orden);
    } catch {
      this.errorServicios = 'No hemos podido cargar los servicios.';
    } finally {
      this.cargandoServicios = false;
    }

    if (this.empresa?.googlePlaceId) {
      this.cargandoGoogle = true;

      try {
        this.datosGoogle =
          await this.empresaService.obtenerDatosGoogle(id);
      } catch {
        this.datosGoogle = null;
      } finally {
        this.cargandoGoogle = false;
      }
    }
  }
}
