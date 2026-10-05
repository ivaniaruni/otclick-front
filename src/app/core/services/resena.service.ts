import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {
  Resena,
  ResumenResenas
} from '../../shared/models/resena';

@Injectable({ providedIn: 'root' })
export class ResenaService {
  constructor(private api: ApiService) {}

  listarPorEmpresa(empresaId: string): Promise<Resena[]> {
    return this.api.get<Resena[]>(
      `/resenas?empresaId=${encodeURIComponent(empresaId)}`
    );
  }

  obtenerResumen(empresaId: string): Promise<ResumenResenas> {
    return this.api.get<ResumenResenas>(
      `/resenas/resumen?empresaId=${encodeURIComponent(empresaId)}`
    );
  }
}
