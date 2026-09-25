import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowForwardOutline,
  calendarOutline,
  searchOutline
} from 'ionicons/icons';

import { EmpresaService } from '../../core/services/empresa.service';
import { Empresa } from '../../shared/models/empresa';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
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
export class HomePage implements OnInit {
  empresas: Empresa[] = [];
  busqueda = '';
  cargando = true;
  error = '';

  constructor(
    private empresaService: EmpresaService,
    private router: Router
  ) {
    addIcons({
      arrowForwardOutline,
      calendarOutline,
      searchOutline
    });
  }

  ngOnInit(): void {
    void this.cargarEmpresas();
  }

  get empresasDestacadas(): Empresa[] {
    return this.empresas.slice(0, 4);
  }

  async cargarEmpresas(): Promise<void> {
    this.cargando = true;
    this.error = '';

    try {
      const respuesta = await this.empresaService.listar();
      this.empresas = respuesta.filter((empresa) => empresa.activa);
    } catch {
      this.error = 'No hemos podido cargar las empresas.';
    } finally {
      this.cargando = false;
    }
  }

  async buscar(): Promise<void> {
    await this.router.navigate(['/tabs/empresas'], {
      queryParams: this.busqueda.trim()
        ? { q: this.busqueda.trim() }
        : {}
    });
  }
}
