import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../features/home/home.page').then(
            (m) => m.HomePage
          ),
      },
      {
        path: 'empresas/:id/reservar',
        loadComponent: () =>
          import('../features/reservas/reservar-cita/reservar-cita.page').then(
            (m) => m.ReservarCitaPage
          ),
      },
      {
        path: 'empresas/:id',
        loadComponent: () =>
          import('../features/empresas/detalle-empresa/detalle-empresa.page').then(
            (m) => m.DetalleEmpresaPage
          ),
      },
      {
        path: 'empresas',
        loadComponent: () =>
          import('../features/empresas/empresas.page').then(
            (m) => m.EmpresasPage
          ),
      },
      {
        path: 'citas',
        loadComponent: () =>
          import('../features/citas/citas.page').then(
            (m) => m.CitasPage
          ),
      },
      {
        path: 'mensajes',
        loadComponent: () =>
          import('../features/mensajes/mensajes.page').then(
            (m) => m.MensajesPage
          ),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('../features/perfil/perfil.page').then(
            (m) => m.PerfilPage
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
