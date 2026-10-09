export interface Trabajador {
  id: string;
  empresaId: string;
  empresaNombre: string | null;
  usuarioId: string;
  nombreCompleto: string | null;
  avatarUrl: string | null;
  email: string | null;
  especialidad: string | null;
  biografia: string | null;
  precioPorHoras: number | null;
  disponibilidadHoraria: string | null;
  activo: boolean;
  fechaCreacion: string | null;
}
