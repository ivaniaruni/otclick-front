import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface ArchivoSubidoResponse {
  url: string;
}

@Injectable({ providedIn: 'root' })
export class ArchivoService {
  constructor(private api: ApiService) {}

  subirAvatar(archivo: File): Promise<ArchivoSubidoResponse> {
    const formData = new FormData();

    formData.append('archivo', archivo);

    return this.api.postFormData<ArchivoSubidoResponse>(
      '/archivos/avatar',
      formData
    );
  }
}
