import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from './api.service';

export interface AuthResponse {
  token: string;
  userId: string;
  email: string;
  nombre: string;
  rol: string;
}

export interface RegisterRequest {
  nombre: string;
  apellido?: string;
  email: string;
  password: string;
  telefono?: string;
  rol: 'CLIENTE';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private tokenCache: string | null = null;
  private readonly storageReady: Promise<void>;

  constructor(
    private storage: Storage,
    private api: ApiService
  ) {
    this.storageReady = this.initStorage();
  }

  private async initStorage(): Promise<void> {
    await this.storage.create();
    this.tokenCache = await this.storage.get(this.TOKEN_KEY);
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/register', data);
    await this.saveToken(response.token);
    return response;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>(
      '/auth/login',
      { email, password }
    );

    await this.saveToken(response.token);
    return response;
  }

  private async saveToken(token: string): Promise<void> {
    await this.storageReady;
    await this.storage.set(this.TOKEN_KEY, token);
    this.tokenCache = token;
  }

  async getToken(): Promise<string | null> {
    await this.storageReady;
    return this.tokenCache;
  }

  async isLoggedIn(): Promise<boolean> {
    return !!(await this.getToken());
  }

  async logout(): Promise<void> {
    await this.storageReady;
    await this.storage.remove(this.TOKEN_KEY);
    this.tokenCache = null;
  }
}
