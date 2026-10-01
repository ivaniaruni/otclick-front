export interface FotoTrabajo {
  id: string;
  empresaId: string;
  trabajadorId: string;
  trabajadorNombre: string | null;
  trabajadorAvatarUrl: string | null;
  imagenUrl: string;
  descripcion: string | null;
  orden: number;
}
