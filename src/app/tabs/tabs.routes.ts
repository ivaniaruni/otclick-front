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
          import('../features/home/home.page').then((m) => m.HomePage)
      },
      {
        path: 'empresas',
        loadComponent: () =>
          import('../features/empresas/empresas.page').then(
            (m) => m.EmpresasPage
          )
      },
      {
        path: 'citas',
        loadComponent: () =>
          import('../features/citas/citas.page').then(
            (m) => m.CitasPage
          )
      },
      {
        path: 'mensajes',
        loadComponent: () =>
          import('../features/mensajes/mensajes.page').then(
            (m) => m.MensajesPage
          )
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];
