import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(path: string): Promise<T> {
    return firstValueFrom(this.http.get<T>(`${this.baseUrl}${path}`));
  }

  post<T>(path: string, body: unknown): Promise<T> {
    return firstValueFrom(this.http.post<T>(`${this.baseUrl}${path}`, body));
  }

  put<T>(path: string, body: unknown): Promise<T> {
    return firstValueFrom(this.http.put<T>(`${this.baseUrl}${path}`, body));
  }

  delete<T>(path: string): Promise<T> {
    return firstValueFrom(this.http.delete<T>(`${this.baseUrl}${path}`));
  }
}
