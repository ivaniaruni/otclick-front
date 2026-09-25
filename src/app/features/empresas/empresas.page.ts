import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchOutline } from 'ionicons/icons';

import { EmpresaService } from '../../core/services/empresa.service';
import { Empresa } from '../../shared/models/empresa';

type VistaEmpresas = 'todas' | 'seguidas';

@Component({
  selector: 'app-empresas',
  standalone: true,
  templateUrl: './empresas.page.html',
  styleUrls: ['./empresas.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonButton,
    IonContent,
    IonIcon,
    IonInput
  ]
})
export class EmpresasPage implements OnInit {
  empresas: Empresa[] = [];
  empresasSeguidas: Empresa[] = [];
  empresaSeleccionada: Empresa | null = null;

  vista: VistaEmpresas = 'todas';
  busqueda = '';
  terminoBuscado = '';

  cargando = true;
  error = '';

  private seguidasCargadas = false;

  constructor(
    private empresaService: EmpresaService,
    private route: ActivatedRoute
  ) {
    addIcons({ searchOutline });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const termino = params.get('q') ?? '';
      this.busqueda = termino;
      this.terminoBuscado = termino;
    });

    void this.cargar();
  }

  get resultados(): Empresa[] {
    const origen = this.vista === 'todas'
      ? this.empresas
      : this.empresasSeguidas;

    const termino = this.normalizar(this.terminoBuscado);

    if (!termino) return origen;

    return origen.filter((empresa) =>
      this.normalizar(
        [empresa.nombre, empresa.descripcion, empresa.direccion]
          .filter(Boolean)
          .join(' ')
      ).includes(termino)
    );
  }

  buscar(): void {
    this.terminoBuscado = this.busqueda.trim();
  }

  async seleccionarVista(vista: VistaEmpresas): Promise<void> {
    if (this.vista === vista) return;

    this.vista = vista;
    this.error = '';

    if (vista === 'seguidas' && !this.seguidasCargadas) {
      await this.cargar();
    }
  }

  async cargar(): Promise<void> {
    this.cargando = true;
    this.error = '';

    try {
      if (this.vista === 'todas') {
        this.empresas = (await this.empresaService.listar())
          .filter((empresa) => empresa.activa);
      } else {
        this.empresasSeguidas = (await this.empresaService.listarSeguidas())
          .filter((empresa) => empresa.activa);

        this.seguidasCargadas = true;
      }
    } catch {
      this.error = this.vista === 'seguidas'
        ? 'Todavía no podemos cargar tus empresas seguidas. Falta conectar esta función con el servidor.'
        : 'No hemos podido cargar las empresas.';
    } finally {
      this.cargando = false;
    }
  }

  abrirEmpresa(empresa: Empresa): void {
    this.empresaSeleccionada = empresa;
  }

  cerrarEmpresa(): void {
    this.empresaSeleccionada = null;
  }

  @HostListener('document:keydown.escape')
  cerrarConEscape(): void {
    this.cerrarEmpresa();
  }

  private normalizar(valor: string): string {
    return valor
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('es')
      .trim();
  }
}
