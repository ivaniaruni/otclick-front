import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  AuthResponse,
  AuthService
} from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class AppHeaderComponent implements OnInit {
  usuario: AuthResponse | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.usuario = await this.authService.getCurrentUser();
  }

  get inicial(): string {
    const nombre = this.usuario?.nombre?.trim();

    return nombre?.charAt(0).toUpperCase() || '?';
  }

  async abrirPerfil(): Promise<void> {
    await this.router.navigateByUrl('/tabs/perfil');
  }
}
