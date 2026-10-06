export type RolUsuario = 'ADMIN' | 'TRABAJADOR' | 'CLIENTE';

export interface Usuario {
  id: string;
  empresaId: string | null;
  empresaNombre: string | null;
  email: string;
  nombre: string;
  apellido: string | null;
  telefono: string | null;
  rol: RolUsuario;
  avatarUrl: string | null;
  activo: boolean;
  emailVerificado: boolean;
  fechaCreacion: string | null;
}

export interface ActualizarPerfilRequest {
  nombre: string;
  apellido: string | null;
  telefono: string | null;
  avatarUrl: string | null;
}
