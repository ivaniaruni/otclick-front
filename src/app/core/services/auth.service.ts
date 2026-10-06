import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from './api.service';
import { Usuario } from '../../shared/models/usuario';

export type RolUsuario = 'ADMIN' | 'TRABAJADOR' | 'CLIENTE';

export interface AuthResponse {
  token?: string;
  userId: string;
  email: string;
  nombre: string;
  rol: RolUsuario;
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
  private readonly USER_KEY = 'auth_user';

  private tokenCache: string | null = null;
  private userCache: AuthResponse | null = null;
  private readonly storageReady: Promise<void>;

  constructor(
    private storage: Storage,
    private api: ApiService,
  ) {
    this.storageReady = this.initStorage();
  }

  private async initStorage(): Promise<void> {
    await this.storage.create();

    this.tokenCache = await this.storage.get(this.TOKEN_KEY);
    this.userCache = await this.storage.get(this.USER_KEY);
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/register', data);

    if (!response.token) {
      throw new Error('El servidor no ha devuelto un token de acceso.');
    }

    await this.saveSession(response);

    return response;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    if (!response.token) {
      throw new Error('El servidor no ha devuelto un token de acceso.');
    }

    await this.saveSession(response);

    return response;
  }

  async getToken(): Promise<string | null> {
    await this.storageReady;
    return this.tokenCache;
  }

  async getCurrentUser(): Promise<AuthResponse | null> {
    await this.storageReady;
    return this.userCache;
  }

  async refreshCurrentUser(): Promise<AuthResponse | null> {
    await this.storageReady;

    if (!this.tokenCache) {
      return null;
    }

    try {
      const user = await this.api.get<AuthResponse>('/auth/me');

      const currentToken = this.tokenCache;
      this.userCache = {
        ...user,
        token: currentToken,
      };

      await this.storage.set(this.USER_KEY, this.userCache);

      return this.userCache;
    } catch {
      await this.logout();
      return null;
    }
  }

  async updateStoredUser(user: Usuario): Promise<void> {
    await this.storageReady;

    if (!this.userCache) {
      return;
    }

    this.userCache = {
      ...this.userCache,
      userId: user.id,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol,
    };

    await this.storage.set(this.USER_KEY, this.userCache);
  }

  async isLoggedIn(): Promise<boolean> {
    await this.storageReady;
    return !!this.tokenCache;
  }

  async hasRole(role: RolUsuario): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user?.rol === role;
  }

  async isClient(): Promise<boolean> {
    return this.hasRole('CLIENTE');
  }

  async isWorker(): Promise<boolean> {
    return this.hasRole('TRABAJADOR');
  }

  async isAdmin(): Promise<boolean> {
    return this.hasRole('ADMIN');
  }

  async logout(): Promise<void> {
    await this.storageReady;

    await this.storage.remove(this.TOKEN_KEY);
    await this.storage.remove(this.USER_KEY);

    this.tokenCache = null;
    this.userCache = null;
  }

  private async saveSession(response: AuthResponse): Promise<void> {
    await this.storageReady;

    const token = response.token;

    if (!token) {
      throw new Error('No se puede guardar una sesión sin token.');
    }

    this.tokenCache = token;
    this.userCache = response;

    await this.storage.set(this.TOKEN_KEY, token);
    await this.storage.set(this.USER_KEY, response);
  }
}
