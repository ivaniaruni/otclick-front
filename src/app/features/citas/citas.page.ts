import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  calendarClearOutline,
  calendarOutline,
  refreshOutline
} from 'ionicons/icons';

import { ApiService } from '../../core/services/api.service';
import {
  AuthResponse,
  AuthService
} from '../../core/services/auth.service';
import { ReservaService } from '../../core/services/reserva.service';
import { Reserva } from '../../shared/models/reserva';

type VistaCitas = 'proximas' | 'historial' | 'todas';

@Component({
  selector: 'app-citas',
  standalone: true,
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonButton,
    IonContent,
    IonIcon
  ]
})
export class CitasPage {
  citas: Reserva[] = [];
  usuario: AuthResponse | null = null;
  vista: VistaCitas = 'proximas';

  cargando = true;
  error = '';

  private readonly estadosFinales = new Set([
    'COMPLETED',
    'CANCELLED',
    'CANCELED',
    'NO_SHOW',
    'REJECTED'
  ]);

  constructor(
    private api: ApiService,
    private reservaService: ReservaService,
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({
      calendarClearOutline,
      calendarOutline,
      refreshOutline
    });
  }

  ionViewWillEnter(): void {
    void this.cargar();
  }

  get citasVisibles(): Reserva[] {
    if (this.vista === 'todas') {
      return this.citas;
    }

    return this.citas.filter((cita) =>
      this.vista === 'proximas'
        ? !this.esFinal(cita)
        : this.esFinal(cita)
    );
  }

  get proximasCount(): number {
    return this.citas.filter((cita) => !this.esFinal(cita)).length;
  }

  get historialCount(): number {
    return this.citas.filter((cita) => this.esFinal(cita)).length;
  }

  async cargar(): Promise<void> {
    this.cargando = true;
    this.error = '';

    try {
      this.usuario = await this.authService.getCurrentUser();

      const usuarioApi = await this.api.get<AuthResponse>('/auth/me');
      const citas = await this.reservaService.listarPorCliente(
        usuarioApi.userId
      );

      this.citas = citas.sort((a, b) =>
        `${a.fecha}T${a.horaInicio}`.localeCompare(
          `${b.fecha}T${b.horaInicio}`
        )
      );
    } catch {
      this.error = 'No hemos podido cargar tus citas.';
    } finally {
      this.cargando = false;
    }
  }

  async abrirPerfil(): Promise<void> {
    await this.router.navigateByUrl('/tabs/perfil');
  }

  seleccionarVista(vista: VistaCitas): void {
    this.vista = vista;
  }

  estadoEnEspanol(estado: string | null | undefined): string {
    const normalizado = this.normalizarEstado(estado);

    const traducciones: Record<string, string> = {
      PENDING: 'Pendiente',
      CONFIRMED: 'Confirmada',
      COMPLETED: 'Completada',
      CANCELLED: 'Cancelada',
      CANCELED: 'Cancelada',
      NO_SHOW: 'No asististe',
      REJECTED: 'Rechazada'
    };

    return traducciones[normalizado] ?? this.capitalizar(normalizado);
  }

  claseEstado(estado: string | null | undefined): string {
    const normalizado = this.normalizarEstado(estado);

    const clases: Record<string, string> = {
      PENDING: 'pending',
      CONFIRMED: 'confirmed',
      COMPLETED: 'completed',
      CANCELLED: 'cancelled',
      CANCELED: 'cancelled',
      NO_SHOW: 'no-show',
      REJECTED: 'cancelled'
    };

    return clases[normalizado] ?? 'unknown';
  }

  fechaEnEspanol(fecha: string): string {
    const [year, month, day] = fecha.split('-').map(Number);

    if (!year || !month || !day) {
      return fecha;
    }

    // Fecha local para evitar desfases de zona horaria.
    const fechaLocal = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    }).format(fechaLocal);
  }

  horaFormateada(hora: string): string {
    return hora?.slice(0, 5) ?? '';
  }

  private esFinal(cita: Reserva): boolean {
    const estado = this.normalizarEstado(cita.estado);

    if (this.estadosFinales.has(estado)) {
      return true;
    }

    const fechaHora = `${cita.fecha}T${this.horaFormateada(cita.horaInicio)}`;
    const fechaCita = new Date(fechaHora);

    return (
      !Number.isNaN(fechaCita.getTime()) &&
      fechaCita.getTime() < Date.now()
    );
  }

  private normalizarEstado(estado: string | null | undefined): string {
    return (estado ?? '')
      .trim()
      .toUpperCase()
      .replace(/[\s-]+/g, '_');
  }

  private capitalizar(valor: string): string {
    if (!valor) {
      return 'Estado pendiente de traducción';
    }

    return valor
      .toLocaleLowerCase('es-ES')
      .replace(/_/g, ' ')
      .replace(/(^|\s)\p{L}/gu, (letra) =>
        letra.toLocaleUpperCase('es-ES')
      );
  }
}
