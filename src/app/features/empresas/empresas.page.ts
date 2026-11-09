import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink,
} from '@angular/router';

import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
} from '@ionic/angular/standalone';

import {
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';

import {
  heart,
  heartOutline,
  searchOutline,
} from 'ionicons/icons';

import {
  AuthResponse,
  AuthService,
} from '../../core/services/auth.service';

import { EmpresaService } from '../../core/services/empresa.service';
import { UsuarioService } from '../../core/services/usuario.service';

import {
  EMPRESAS_TRADUCCIONES,
} from '../../core/i18n/empresas.traducciones';

import {
  IdiomaApp,
} from '../../core/i18n/traducciones';

import {
  SelectorIdiomaComponent,
} from '../../shared/components/selector-idioma/selector-idioma.component';

import { Empresa } from '../../shared/models/empresa';

type VistaEmpresas = 'todas' | 'seguidas';

@Component({
  selector: 'app-empresas',
  standalone: true,
  templateUrl: './empresas.page.html',
  styleUrls: ['./empresas.page.scss'],
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
export class EmpresasPage implements OnInit, OnDestroy {
  empresas: Empresa[] = [];
  empresasSeguidas: Empresa[] = [];

  idsSeguidas = new Set<string>();
  corazonesOcupados = new Set<string>();

  usuario: AuthResponse | null = null;
  avatarFallido = false;

  vista: VistaEmpresas = 'todas';
  busqueda = '';
  terminoBuscado = '';

  cargando = true;
  cargandoSeguidas = false;

  error = '';
  errorSeguimiento = '';
  nombreErrorSeguimiento = '';

  private queryParamsSubscription?: Subscription;

  constructor(
    private empresaService: EmpresaService,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
  ) {
    addIcons({
      heart,
      heartOutline,
      searchOutline,
    });

    this.registrarTraducciones();
  }

  ngOnInit(): void {
    this.queryParamsSubscription =
      this.route.queryParamMap.subscribe((params) => {
        const termino = params.get('q') ?? '';

        this.busqueda = termino;
        this.terminoBuscado = termino;
      });

    void this.cargarEmpresas();
  }

  ionViewWillEnter(): void {
    void this.cargarUsuario();
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
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

  get resultados(): Empresa[] {
    const origen =
      this.vista === 'todas'
        ? this.empresas
        : this.empresasSeguidas;

    const termino = this.normalizar(this.terminoBuscado);

    if (!termino) {
      return origen;
    }

    return origen.filter((empresa) =>
      this.normalizar(
        [
          empresa.nombre,
          empresa.descripcion,
          empresa.direccion,
        ]
          .filter(Boolean)
          .join(' '),
      ).includes(termino),
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

  async cargar(): Promise<void> {
    if (this.vista === 'seguidas') {
      await this.cargarSeguidas();
      return;
    }

    await this.cargarEmpresas();
  }

  async cargarEmpresas(): Promise<void> {
    this.cargando = true;
    this.error = '';

    try {
      const empresas = await this.empresaService.listar();

      this.empresas = empresas.filter(
        (empresa) => empresa.activa,
      );
    } catch {
      this.error = 'EMPRESAS.ERROR_CARGAR';
    } finally {
      this.cargando = false;
    }
  }

  async cargarSeguidas(): Promise<void> {
    this.cargandoSeguidas = true;
    this.cargando = true;
    this.error = '';
    this.limpiarErrorSeguimiento();

    try {
      const seguidas =
        await this.empresaService.listarSeguidas();

      this.empresasSeguidas = seguidas.filter(
        (empresa) => empresa.activa,
      );

      this.idsSeguidas = new Set(
        this.empresasSeguidas.map(
          (empresa) => empresa.id,
        ),
      );
    } catch {
      this.error = 'EMPRESAS.ERROR_CARGAR_SEGUIDAS';
    } finally {
      this.cargandoSeguidas = false;
      this.cargando = false;
    }
  }

  buscar(): void {
    this.terminoBuscado = this.busqueda.trim();
  }

  async seleccionarVista(
    vista: VistaEmpresas,
  ): Promise<void> {
    this.vista = vista;
    this.error = '';
    this.limpiarErrorSeguimiento();

    if (vista === 'seguidas') {
      await this.cargarSeguidas();
    }
  }

  async alternarSeguimiento(
    empresa: Empresa,
  ): Promise<void> {
    if (this.corazonesOcupados.has(empresa.id)) {
      return;
    }

    const yaSeguida =
      this.idsSeguidas.has(empresa.id);

    this.corazonesOcupados.add(empresa.id);
    this.limpiarErrorSeguimiento();

    try {
      if (yaSeguida) {
        await this.empresaService.dejarDeSeguir(
          empresa.id,
        );

        this.idsSeguidas = new Set(
          [...this.idsSeguidas].filter(
            (id) => id !== empresa.id,
          ),
        );

        this.empresasSeguidas =
          this.empresasSeguidas.filter(
            (item) => item.id !== empresa.id,
          );
      } else {
        await this.empresaService.seguir(empresa.id);

        this.idsSeguidas = new Set([
          ...this.idsSeguidas,
          empresa.id,
        ]);

        this.empresasSeguidas = [
          ...this.empresasSeguidas,
          empresa,
        ];
      }
    } catch {
      this.nombreErrorSeguimiento = empresa.nombre;

      this.errorSeguimiento = yaSeguida
        ? 'EMPRESAS.ERROR_DEJAR_SEGUIR'
        : 'EMPRESAS.ERROR_SEGUIR';
    } finally {
      this.corazonesOcupados.delete(empresa.id);
    }
  }

  async abrirPerfil(): Promise<void> {
    await this.router.navigateByUrl('/tabs/perfil');
  }

  private registrarTraducciones(): void {
    const idiomas = Object.keys(
      EMPRESAS_TRADUCCIONES,
    ) as IdiomaApp[];

    for (const idioma of idiomas) {
      this.translate.setTranslation(
        idioma,
        {
          EMPRESAS: EMPRESAS_TRADUCCIONES[idioma],
        },
        true,
      );
    }
  }

  private limpiarErrorSeguimiento(): void {
    this.errorSeguimiento = '';
    this.nombreErrorSeguimiento = '';
  }

  private normalizar(valor: string): string {
    return valor
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('es')
      .trim();
  }
}
