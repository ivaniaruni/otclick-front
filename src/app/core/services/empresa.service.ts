import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Empresa } from '../../shared/models/empresa';

@Injectable({ providedIn: 'root' })
export class EmpresaService {
  constructor(private api: ApiService) {}

  listar(): Promise<Empresa[]> {
    return this.api.get<Empresa[]>('/empresas');
  }

  obtenerPorId(id: string): Promise<Empresa> {
    return this.api.get<Empresa>(`/empresas/${id}`);
  }
}
