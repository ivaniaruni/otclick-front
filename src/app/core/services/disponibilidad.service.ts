import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface SlotDisponible {
  horaInicio: string;
  horaFin: string;
}

export interface DisponibilidadDia {
  empresaId: string;
  trabajadorId: string;
  servicioId: string;
  fecha: string;
  duracionMinutos: number;
  slots: SlotDisponible[];
}

@Injectable({ providedIn: 'root' })
export class DisponibilidadService {
  constructor(private api: ApiService) {}

  obtenerSlots(
    trabajadorId: string,
    servicioId: string,
    fecha: string
  ): Promise<DisponibilidadDia> {
    const params = new URLSearchParams({
      trabajadorId,
      servicioId,
      fecha
    });

    return this.api.get<DisponibilidadDia>(
      `/disponibilidad/slots?${params.toString()}`
    );
  }
}
