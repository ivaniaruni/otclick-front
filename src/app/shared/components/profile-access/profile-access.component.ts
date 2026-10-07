import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthResponse,
  AuthService
} from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile-access',
  standalone: true,
  templateUrl: './profile-access.component.html',
  styleUrls: ['./profile-access.component.scss'],
  imports: [
    CommonModule
  ]
})
export class ProfileAccessComponent implements OnInit {
  usuario: AuthResponse | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.usuario = await this.authService.getCurrentUser();
  }

  get inicial(): string {
    return this.usuario?.nombre?.trim().charAt(0).toUpperCase() || '?';
  }

  async abrirPerfil(): Promise<void> {
    await this.router.navigateByUrl('/tabs/perfil');
  }
}
