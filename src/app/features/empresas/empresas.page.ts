import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonInput
} from '@ionic/angular/standalone';

import { EmpresaService } from '../../core/services/empresa.service';
import { Empresa } from '../../shared/models/empresa';

@Component({
  selector: 'app-empresas',
  standalone: true,
  templateUrl: './empresas.page.html',
  styleUrls: ['./empresas.page.scss'],
  imports: [CommonModule, FormsModule, IonButton, IonContent, IonInput]
})
export class EmpresasPage implements OnInit {
  empresas: Empresa[] = [];
  busqueda = '';
  cargando = true;
  error = '';

  constructor(
    private empresaService: EmpresaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.busqueda = params.get('q') ?? '';
    });

    void this.cargar();
  }

  get resultados(): Empresa[] {
    const termino = this.normalizar(this.busqueda);

    if (!termino) return this.empresas;

    return this.empresas.filter((empresa) =>
      this.normalizar(
        [empresa.nombre, empresa.descripcion, empresa.direccion]
          .filter(Boolean)
          .join(' ')
      ).includes(termino)
    );
  }

  async cargar(): Promise<void> {
    this.cargando = true;
    this.error = '';

    try {
      this.empresas = (await this.empresaService.listar())
        .filter((empresa) => empresa.activa);
    } catch {
      this.error = 'No hemos podido cargar las empresas.';
    } finally {
      this.cargando = false;
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
