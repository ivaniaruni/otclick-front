export type EstadoReserva =
  | 'PENDING'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW';

export interface Reserva {
  id: string;
  empresaId: string;
  empresaNombre: string | null;
  clienteId: string;
  clienteNombre: string | null;
  trabajadorId: string;
  trabajadorNombre: string | null;
  servicioId: string;
  servicioNombre: string | null;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: EstadoReserva;
  precioTotal: number | null;
  notas: string | null;
  fechaCreacion: string | null;
  fechaActualizacion: string | null;
}

export interface CrearReservaRequest {
  empresaId: string;
  trabajadorId: string;
  servicioId: string;
  fecha: string;
  horaInicio: string;
  notas?: string | null;
}
