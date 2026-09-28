import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, heartOutline, searchOutline } from 'ionicons/icons';

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
    RouterLink,
    IonButton,
    IonContent,
    IonIcon,
    IonInput
  ]
})
export class EmpresasPage implements OnInit {
  empresas: Empresa[] = [];
  empresasSeguidas: Empresa[] = [];

  idsSeguidas = new Set<string>();
  corazonesOcupados = new Set<string>();

  vista: VistaEmpresas = 'todas';
  busqueda = '';
  terminoBuscado = '';

  cargando = true;
  error = '';
  errorSeguimiento = '';

  constructor(
    private empresaService: EmpresaService,
    private route: ActivatedRoute
  ) {
    addIcons({ heart, heartOutline, searchOutline });
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

  seleccionarVista(vista: VistaEmpresas): void {
    this.vista = vista;
    this.errorSeguimiento = '';
  }

  async cargar(): Promise<void> {
    this.cargando = true;
    this.error = '';
    this.errorSeguimiento = '';

    try {
      const [todas, seguidas] = await Promise.all([
        this.empresaService.listar(),
        this.empresaService.listarSeguidas()
      ]);

      this.empresas = todas.filter((empresa) => empresa.activa);
      this.empresasSeguidas = seguidas.filter((empresa) => empresa.activa);
      this.idsSeguidas = new Set(
        this.empresasSeguidas.map((empresa) => empresa.id)
      );
    } catch {
      this.error = 'No hemos podido cargar las empresas.';
    } finally {
      this.cargando = false;
    }
  }

  async alternarSeguimiento(empresa: Empresa): Promise<void> {
    if (this.corazonesOcupados.has(empresa.id)) return;

    const yaSeguida = this.idsSeguidas.has(empresa.id);
    this.corazonesOcupados.add(empresa.id);
    this.errorSeguimiento = '';

    try {
      if (yaSeguida) {
        await this.empresaService.dejarDeSeguir(empresa.id);

        this.idsSeguidas = new Set(
          [...this.idsSeguidas].filter((id) => id !== empresa.id)
        );
        this.empresasSeguidas = this.empresasSeguidas.filter(
          (item) => item.id !== empresa.id
        );
      } else {
        await this.empresaService.seguir(empresa.id);

        this.idsSeguidas = new Set([
          ...this.idsSeguidas,
          empresa.id
        ]);
        this.empresasSeguidas = [
          ...this.empresasSeguidas,
          empresa
        ];
      }
    } catch {
      this.errorSeguimiento = yaSeguida
        ? `No hemos podido dejar de seguir a ${empresa.nombre}. Inténtalo de nuevo.`
        : `No hemos podido seguir a ${empresa.nombre}. Inténtalo de nuevo.`;
    } finally {
      this.corazonesOcupados.delete(empresa.id);
    }
  }

  private normalizar(valor: string): string {
    return valor
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('es')
      .trim();
  }
}
