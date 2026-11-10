import { Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

import {
  tabsRolGuard,
} from '../core/guards/tabs-rol.guard';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivateChild: [tabsRolGuard],
    children: [
      {
        path: 'mi-empresa',
        data: {
          accesoTabs: 'trabajador',
        },
        loadComponent: () =>
          import(
            '../features/trabajador/mi-empresa/mi-empresa.page'
          ).then(
            (m) => m.MiEmpresaTrabajadorPage,
          ),
      },

      {
        path: 'agenda-trabajador',
        data: {
          accesoTabs: 'trabajador',
        },
        loadComponent: () =>
          import(
            '../features/trabajador/agenda/agenda-trabajador.page'
          ).then(
            (m) => m.AgendaTrabajadorPage,
          ),
      },

      {
        path: 'home',
        data: {
          accesoTabs: 'general',
        },
        loadComponent: () =>
          import(
            '../features/home/home.page'
          ).then(
            (m) => m.HomePage,
          ),
      },

      {
        path: 'empresas/:id/reservar',
        data: {
          accesoTabs: 'general',
        },
        loadComponent: () =>
          import(
            '../features/reservas/reservar-cita/reservar-cita.page'
          ).then(
            (m) => m.ReservarCitaPage,
          ),
      },

      {
        path: 'empresas/:id',
        data: {
          accesoTabs: 'general',
        },
        loadComponent: () =>
          import(
            '../features/empresas/detalle-empresa/detalle-empresa.page'
          ).then(
            (m) => m.DetalleEmpresaPage,
          ),
      },

      {
        path: 'empresas',
        data: {
          accesoTabs: 'general',
        },
        loadComponent: () =>
          import(
            '../features/empresas/empresas.page'
          ).then(
            (m) => m.EmpresasPage,
          ),
      },

      {
        path: 'citas',
        data: {
          accesoTabs: 'general',
        },
        loadComponent: () =>
          import(
            '../features/citas/citas.page'
          ).then(
            (m) => m.CitasPage,
          ),
      },

      {
        path: 'mensajes/:chatId',
        data: {
          accesoTabs: 'compartida',
        },
        loadComponent: () =>
          import(
            '../features/mensajes/mensajes.page'
          ).then(
            (m) => m.MensajesPage,
          ),
      },

      {
        path: 'mensajes',
        data: {
          accesoTabs: 'compartida',
        },
        loadComponent: () =>
          import(
            '../features/mensajes/mensajes.page'
          ).then(
            (m) => m.MensajesPage,
          ),
      },

      {
        path: 'perfil',
        data: {
          accesoTabs: 'compartida',
        },
        loadComponent: () =>
          import(
            '../features/perfil/perfil.page'
          ).then(
            (m) => m.PerfilPage,
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
