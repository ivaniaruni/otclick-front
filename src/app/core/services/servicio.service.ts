import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Servicio } from '../../shared/models/servicio';

@Injectable({ providedIn: 'root' })
export class ServicioService {
  constructor(private api: ApiService) {}

  listarActivosPorEmpresa(empresaId: string): Promise<Servicio[]> {
    return this.api.get<Servicio[]>(
      `/servicios?empresaId=${encodeURIComponent(empresaId)}&activos=true`
    );
  }
}
