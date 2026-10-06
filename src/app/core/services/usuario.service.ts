import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {
  ActualizarPerfilRequest,
  Usuario
} from '../../shared/models/usuario';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  constructor(private api: ApiService) {}

  obtenerMiPerfil(): Promise<Usuario> {
    return this.api.get<Usuario>('/usuarios/me');
  }

  actualizarMiPerfil(
    data: ActualizarPerfilRequest
  ): Promise<Usuario> {
    return this.api.put<Usuario>('/usuarios/me', data);
  }
}
