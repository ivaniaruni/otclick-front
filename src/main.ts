import {
  inject,
  provideAppInitializer,
} from '@angular/core';

import { bootstrapApplication } from '@angular/platform-browser';

import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
  withDebugTracing,
} from '@angular/router';

import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { Storage } from '@ionic/storage-angular';

import {
  provideTranslateService,
} from '@ngx-translate/core';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import {
  authInterceptor,
} from './app/core/interceptors/auth.interceptor';

import {
  IdiomaService,
} from './app/core/services/idioma.service';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },

    provideIonicAngular(),

    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withDebugTracing(),
    ),

    provideHttpClient(
      withInterceptors([authInterceptor]),
    ),

    Storage,

    provideTranslateService(),

    provideAppInitializer(() =>
      inject(IdiomaService).inicializar(),
    ),
  ],
}).catch((error) => {
  console.error('Error al arrancar Angular:', error);
});
