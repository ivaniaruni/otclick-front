export interface Reserva {
  id: string;
  empresaId: string;
  empresaNombre: string | null;
  clienteId: string;
  trabajadorId: string;
  trabajadorNombre: string | null;
  servicioId: string;
  servicioNombre: string | null;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  precioTotal: number | null;
}
