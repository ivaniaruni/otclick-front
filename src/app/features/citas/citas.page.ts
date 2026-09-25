import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonButton, IonContent } from '@ionic/angular/standalone';

import { ApiService } from '../../core/services/api.service';
import { ReservaService } from '../../core/services/reserva.service';
import { AuthResponse } from '../../core/services/auth.service';
import { Reserva } from '../../shared/models/reserva';

@Component({
  selector: 'app-citas',
  standalone: true,
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
  imports: [CommonModule, IonButton, IonContent]
})
export class CitasPage implements OnInit {
  citas: Reserva[] = [];
  cargando = true;
  error = '';

  constructor(
    private api: ApiService,
    private reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    void this.cargar();
  }

  async cargar(): Promise<void> {
    this.cargando = true;
    this.error = '';

    try {
      const usuario = await this.api.get<AuthResponse>('/auth/me');

      this.citas = (await this.reservaService.listarPorCliente(usuario.userId))
        .sort((a, b) =>
          `${b.fecha}T${b.horaInicio}`
            .localeCompare(`${a.fecha}T${a.horaInicio}`)
        );
    } catch {
      this.error = 'No hemos podido cargar tus citas.';
    } finally {
      this.cargando = false;
    }
  }
}
