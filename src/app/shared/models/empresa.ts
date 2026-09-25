export interface Empresa {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  logoUrl: string | null;
  direccion: string | null;
  telefono: string | null;
  email: string | null;
  activa: boolean;
}
