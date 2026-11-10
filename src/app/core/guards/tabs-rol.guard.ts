import { inject } from '@angular/core';

import {
  CanActivateChildFn,
  Router,
} from '@angular/router';

import {
  AuthService,
} from '../services/auth.service';

export const tabsRolGuard: CanActivateChildFn =
  async (ruta) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    const usuario = await auth.getCurrentUser();
    const tieneSesion = await auth.isLoggedIn();

    if (!usuario || !tieneSesion) {
      return false;
    }

    const acceso = ruta.data['accesoTabs'];

    const esTrabajador =
      usuario.rol === 'TRABAJADOR';

    if (acceso === 'compartida') {
      return true;
    }

    if (acceso === 'trabajador') {
      return esTrabajador
        ? true
        : router.parseUrl('/tabs/home');
    }

    if (acceso === 'general') {
      return esTrabajador
        ? router.parseUrl('/tabs/agenda-trabajador')
        : true;
    }

    return false;
  };
