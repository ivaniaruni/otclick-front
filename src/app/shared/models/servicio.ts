export interface Servicio {
  id: string;
  empresaId: string;
  empresaNombre: string | null;
  categoriaId: string | null;
  categoriaNombre: string | null;
  nombre: string;
  descripcion: string | null;
  duracionMinutos: number;
  precio: number;
  imagenUrl: string | null;
  trabajadorIds?: string[] | null;
  activa: boolean;
  orden: number;
  fechaCreacion: string | null;
}
