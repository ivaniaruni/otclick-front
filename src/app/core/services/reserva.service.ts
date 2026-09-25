import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Reserva } from '../../shared/models/reserva';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  constructor(private api: ApiService) {}

  listarPorCliente(clienteId: string): Promise<Reserva[]> {
    return this.api.get<Reserva[]>(
      `/reservas/cliente/${clienteId}`
    );
  }
}
