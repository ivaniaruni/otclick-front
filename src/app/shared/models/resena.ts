export interface Resena {
  id: string;
  empresaId: string;
  reservaId: string;
  autorNombre: string | null;
  autorAvatarUrl: string | null;
  puntuacion: number;
  comentario: string | null;
  servicioNombre: string | null;
  trabajadorNombre: string | null;
  fechaCreacion: string;
}

export interface ResumenResenas {
  valoracionMedia: number | null;
  totalResenas: number;
}
