import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface Conversacion {
  id: string;

  clienteId: string;
  clienteNombre: string;

  empresaId: string;
  empresaNombre: string;
  empresaLogoUrl: string | null;

  ultimoMensaje: string | null;
  ultimaActividad: string;

  puedeGestionarReservas: boolean;
}

export interface MensajeChat {
  id: string;
  conversacionId: string;
  remitenteId: string;
  remitenteNombre: string;
  tipo: 'TEXTO' | 'SOLICITUD_RESERVA';
  contenido: string | null;
  reservaId: string | null;
  reservaEstado: string | null;
  servicioNombre: string | null;
  reservaFecha: string | null;
  reservaHoraInicio: string | null;
  reservaPrecio: number | null;
  motivoCancelacion: string | null;
  fechaCreacion: string;
}

export interface HistorialChat {
  mensajes: MensajeChat[];
  pagina: number;
  tamano: number;
  totalMensajes: number;
  hayMas: boolean;
}

@Injectable({ providedIn: 'root' })
export class ConversacionService {
  constructor(private api: ApiService) {}

  listar(): Promise<Conversacion[]> {
    return this.api.get<Conversacion[]>('/conversaciones');
  }

  obtener(id: string): Promise<Conversacion> {
    return this.api.get<Conversacion>(
      `/conversaciones/${encodeURIComponent(id)}`,
    );
  }

  abrirDesdeReserva(id: string): Promise<Conversacion> {
    return this.api.post<Conversacion>(
      `/conversaciones/desde-reserva/${encodeURIComponent(id)}`,
      {},
    );
  }

  mensajes(id: string, pagina = 0): Promise<HistorialChat> {
    return this.api.get<HistorialChat>(
      `/conversaciones/${encodeURIComponent(id)}/mensajes` +
      `?pagina=${pagina}&tamano=30`,
    );
  }

  enviar(id: string, contenido: string): Promise<MensajeChat> {
    return this.api.post<MensajeChat>(
      `/conversaciones/${encodeURIComponent(id)}/mensajes`,
      { contenido },
    );
  }
}
