import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { FotoTrabajo } from '../../shared/models/foto-trabajo';

@Injectable({ providedIn: 'root' })
export class FotoTrabajoService {
  constructor(private api: ApiService) {}

  listarPorEmpresa(empresaId: string): Promise<FotoTrabajo[]> {
    return this.api.get<FotoTrabajo[]>(
      `/fotos-trabajos?empresaId=${encodeURIComponent(empresaId)}`
    );
  }
}
