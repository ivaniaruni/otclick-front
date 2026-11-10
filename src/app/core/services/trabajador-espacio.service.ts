import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

export type EstadoEspacioTrabajador =
  | 'DISPONIBLE'
  | 'SIN_VINCULACION';

export interface EmpresaDelTrabajador {
  id: string;
  nombre: string;
  descripcion?: string | null;
  logoUrl?: string | null;
  direccion?: string | null;
  telefono?: string | null;
  email?: string | null;
}

export interface FichaProfesionalTrabajador {
  id: string;
  usuarioId?: string;
  nombreCompleto: string;
  avatarUrl?: string | null;
  especialidad?: string | null;
  biografia?: string | null;
  disponibilidadHoraria?: string | null;
}

export interface ServicioDelTrabajador {
  id?: string;
  nombre: string;
  descripcion?: string | null;
  duracionMinutos: number;
  precio: number;
}

export interface EspacioTrabajador {
  estado: EstadoEspacioTrabajador;
  empresa: EmpresaDelTrabajador | null;
  trabajador: FichaProfesionalTrabajador | null;
  servicios: ServicioDelTrabajador[];
}

export interface FranjaLaboral {
  horaInicio: string;
  horaFin: string;
}

export interface DiaHorarioTrabajador {
  fecha: string;
  diaSemana: string;
  horarioAsignado: FranjaLaboral[];
  horarioEmpresa: FranjaLaboral[];
  horarioEfectivo: FranjaLaboral[];
}

export interface SemanaHorarioTrabajador {
  estado: EstadoEspacioTrabajador;
  fechaInicio: string;
  fechaFin: string;
  dias: DiaHorarioTrabajador[];
}

@Injectable({
  providedIn: 'root',
})
export class TrabajadorEspacioService {
  constructor(
    private api: ApiService,
  ) {}

  obtenerEspacio(): Promise<EspacioTrabajador> {
    return this.api.get<EspacioTrabajador>(
      '/trabajadores/me/espacio',
    );
  }

  obtenerHorario(
    fechaInicio?: string,
  ): Promise<SemanaHorarioTrabajador> {
    const consulta = fechaInicio
      ? `?fechaInicio=${encodeURIComponent(fechaInicio)}`
      : '';

    return this.api.get<SemanaHorarioTrabajador>(
      `/trabajadores/me/horario${consulta}`,
    );
  }
}
