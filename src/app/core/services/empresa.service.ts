import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Empresa } from '../../shared/models/empresa';
import { EmpresaGoogle } from '../../shared/models/empresa-google';

@Injectable({ providedIn: 'root' })
export class EmpresaService {
  constructor(private api: ApiService) {}

  listar(): Promise<Empresa[]> {
    return this.api.get<Empresa[]>('/empresas');
  }

  listarSeguidas(): Promise<Empresa[]> {
    return this.api.get<Empresa[]>('/empresas/seguidas');
  }

  obtenerPorId(id: string): Promise<Empresa> {
    return this.api.get<Empresa>(`/empresas/${id}`);
  }

  obtenerDatosGoogle(id: string): Promise<EmpresaGoogle> {
    return this.api.get<EmpresaGoogle>(`/empresas/${id}/google`);
  }

  seguir(id: string): Promise<void> {
    return this.api.put<void>(`/empresas/${id}/seguir`, {});
  }

  dejarDeSeguir(id: string): Promise<void> {
    return this.api.delete<void>(`/empresas/${id}/seguir`);
  }
}
