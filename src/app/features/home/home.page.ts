import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import {
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  arrowForwardOutline,
  calendarOutline,
  chatbubblesOutline,
  searchOutline,
} from 'ionicons/icons';

import {
  AuthResponse,
  AuthService,
} from '../../core/services/auth.service';

import {
  EmpresaService,
} from '../../core/services/empresa.service';

import {
  UsuarioService,
} from '../../core/services/usuario.service';

import {
  HOME_TRADUCCIONES,
} from '../../core/i18n/home.traducciones';

import {
  IdiomaApp,
} from '../../core/i18n/traducciones';

import {
  SelectorIdiomaComponent,
} from '../../shared/components/selector-idioma/selector-idioma.component';

import { Empresa } from '../../shared/models/empresa';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonButton,
    IonContent,
    IonIcon,
    IonInput,
    TranslatePipe,
    SelectorIdiomaComponent,
  ],
})
export class HomePage implements OnInit {
  empresas: Empresa[] = [];
  usuario: AuthResponse | null = null;

  busqueda = '';
  cargando = true;
  error = '';

  avatarFallido = false;

  constructor(
    private empresaService: EmpresaService,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router,
    private translate: TranslateService,
  ) {
    addIcons({
      arrowForwardOutline,
      calendarOutline,
      chatbubblesOutline,
      searchOutline,
    });

    this.registrarTraducciones();
  }

  ngOnInit(): void {
    void this.cargarEmpresas();
  }

  ionViewWillEnter(): void {
    void this.cargarUsuario();
  }

  get empresasDestacadas(): Empresa[] {
    return this.empresas.slice(0, 4);
  }

  get fotoPerfil(): string {
    return this.usuario?.avatarUrl?.trim() ?? '';
  }

  get inicialPerfil(): string {
    return (
      this.usuario?.nombre?.trim().charAt(0).toUpperCase() ||
      '?'
    );
  }

  async cargarUsuario(): Promise<void> {
    try {
      this.usuario = await this.authService.getCurrentUser();
      this.avatarFallido = false;

      if (!this.usuario) {
        return;
      }

      const perfil =
        await this.usuarioService.obtenerMiPerfil();

      await this.authService.updateStoredUser(perfil);

      this.usuario = await this.authService.getCurrentUser();
      this.avatarFallido = false;
    } catch {
      console.warn(
        'No se ha podido actualizar el perfil de la cabecera.',
      );
    }
  }

  marcarAvatarFallido(): void {
    this.avatarFallido = true;
  }

  async cargarEmpresas(): Promise<void> {
    this.cargando = true;
    this.error = '';

    try {
      const respuesta =
        await this.empresaService.listar();

      this.empresas = respuesta.filter(
        (empresa) => empresa.activa,
      );
    } catch {
      this.error = 'HOME.ERROR_CARGAR';
    } finally {
      this.cargando = false;
    }
  }

  async buscar(): Promise<void> {
    const termino = this.busqueda.trim();

    await this.router.navigate(['/tabs/empresas'], {
      queryParams: termino ? { q: termino } : {},
    });
  }

  async abrirPerfil(): Promise<void> {
    await this.router.navigateByUrl('/tabs/perfil');
  }

  private registrarTraducciones(): void {
    const idiomas = Object.keys(
      HOME_TRADUCCIONES,
    ) as IdiomaApp[];

    for (const idioma of idiomas) {
      this.translate.setTranslation(
        idioma,
        {
          HOME: HOME_TRADUCCIONES[idioma],
        },
        true,
      );
    }
  }
}
