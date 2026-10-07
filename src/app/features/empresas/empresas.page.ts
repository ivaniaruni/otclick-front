import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  heart,
  heartOutline,
  searchOutline
} from 'ionicons/icons';
import {
  AuthResponse,
  AuthService
} from '../../core/services/auth.service';
import { EmpresaService } from '../../core/services/empresa.service';
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
    IonInput
  ]
})
export class EmpresasPage implements OnInit {
  empresas: Empresa[] = [];
  empresasSeguidas: Empresa[] = [];

  idsSeguidas = new Set<string>();
  corazonesOcupados = new Set<string>();

  usuario: AuthResponse | null = null;

  vista: VistaEmpresas = 'todas';
  busqueda = '';
  terminoBuscado = '';

  cargando = true;
  cargandoSeguidas = false;
  error = '';
  errorSeguimiento = '';

  constructor(
    private empresaService: EmpresaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    addIcons({
      heart,
      heartOutline,
      searchOutline
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const termino = params.get('q') ?? '';

      this.busqueda = termino;
      this.terminoBuscado = termino;
    });

    void this.inicializarPagina();
  }

  get resultados(): Empresa[] {
    const origen = this.vista === 'todas'
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
          empresa.direccion
        ]
          .filter(Boolean)
          .join(' ')
      ).includes(termino)
    );
  }

  async inicializarPagina(): Promise<void> {
    await Promise.all([
      this.cargarUsuario(),
      this.cargarEmpresas()
    ]);
  }

  async cargarUsuario(): Promise<void> {
    this.usuario = await this.authService.getCurrentUser();
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
        (empresa) => empresa.activa
      );
    } catch {
      this.error = 'No hemos podido cargar las empresas.';
    } finally {
      this.cargando = false;
    }
  }

  async cargarSeguidas(): Promise<void> {
    this.cargandoSeguidas = true;
    this.cargando = true;
    this.error = '';
    this.errorSeguimiento = '';

    try {
      const seguidas = await this.empresaService.listarSeguidas();

      this.empresasSeguidas = seguidas.filter(
        (empresa) => empresa.activa
      );

      this.idsSeguidas = new Set(
        this.empresasSeguidas.map(
          (empresa) => empresa.id
        )
      );
    } catch {
      this.error = 'No hemos podido cargar tus empresas seguidas.';
    } finally {
      this.cargandoSeguidas = false;
      this.cargando = false;
    }
  }

  buscar(): void {
    this.terminoBuscado = this.busqueda.trim();
  }

  async seleccionarVista(vista: VistaEmpresas): Promise<void> {
    this.vista = vista;
    this.error = '';
    this.errorSeguimiento = '';

    if (vista === 'seguidas') {
      await this.cargarSeguidas();
    }
  }

  async alternarSeguimiento(empresa: Empresa): Promise<void> {
    if (this.corazonesOcupados.has(empresa.id)) {
      return;
    }

    const yaSeguida = this.idsSeguidas.has(empresa.id);

    this.corazonesOcupados.add(empresa.id);
    this.errorSeguimiento = '';

    try {
      if (yaSeguida) {
        await this.empresaService.dejarDeSeguir(empresa.id);

        this.idsSeguidas = new Set(
          [...this.idsSeguidas].filter(
            (id) => id !== empresa.id
          )
        );

        this.empresasSeguidas = this.empresasSeguidas.filter(
          (item) => item.id !== empresa.id
        );
      } else {
        await this.empresaService.seguir(empresa.id);

        this.idsSeguidas = new Set([
          ...this.idsSeguidas,
          empresa.id
        ]);

        this.empresasSeguidas = [
          ...this.empresasSeguidas,
          empresa
        ];
      }
    } catch {
      this.errorSeguimiento = yaSeguida
        ? `No hemos podido dejar de seguir a ${empresa.nombre}. Inténtalo de nuevo.`
        : `No hemos podido seguir a ${empresa.nombre}. Inténtalo de nuevo.`;
    } finally {
      this.corazonesOcupados.delete(empresa.id);
    }
  }

  async abrirPerfil(): Promise<void> {
    await this.router.navigateByUrl('/tabs/perfil');
  }

  private normalizar(valor: string): string {
    return valor
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('es')
      .trim();
  }
}
