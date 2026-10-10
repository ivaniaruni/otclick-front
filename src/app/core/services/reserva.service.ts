import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CrearReservaRequest, Reserva } from '../../shared/models/reserva';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  constructor(private api: ApiService) {}

  crear(request: CrearReservaRequest): Promise<Reserva> {
    return this.api.post<Reserva>('/reservas', request);
  }

  listarPorCliente(clienteId: string): Promise<Reserva[]> {
    return this.api.get<Reserva[]>(
      `/reservas/cliente/${encodeURIComponent(clienteId)}`,
    );
  }

  listarPorEmpresa(empresaId: string): Promise<Reserva[]> {
    return this.api.get<Reserva[]>(
      `/reservas/empresa/${encodeURIComponent(empresaId)}`,
    );
  }

  listarPorTrabajador(trabajadorId: string): Promise<Reserva[]> {
    return this.api.get<Reserva[]>(
      `/reservas/trabajador/${encodeURIComponent(trabajadorId)}`,
    );
  }

  obtenerPorId(id: string): Promise<Reserva> {
    return this.api.get<Reserva>(`/reservas/${encodeURIComponent(id)}`);
  }

  cancelar(id: string, motivo?: string): Promise<Reserva> {
    const query = motivo?.trim()
      ? `?motivo=${encodeURIComponent(motivo.trim())}`
      : '';

    return this.api.patch<Reserva>(
      `/reservas/${encodeURIComponent(id)}/cancelar${query}`,
      {},
    );
  }
}
