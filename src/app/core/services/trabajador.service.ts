import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Trabajador } from '../../shared/models/trabajador';

@Injectable({ providedIn: 'root' })
export class TrabajadorService {
  constructor(private api: ApiService) {}

  listarActivosPorEmpresa(empresaId: string): Promise<Trabajador[]> {
    return this.api.get<Trabajador[]>(
      `/trabajadores?empresaId=${encodeURIComponent(empresaId)}&activos=true`
    );
  }
}
