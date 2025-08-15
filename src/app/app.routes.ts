import { Routes } from '@angular/router';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inflables',
    pathMatch: 'full'
  },
  {
    path: 'inflables',
    loadChildren: () =>
      import('./inflables/inflables.routes').then(m => m.INFLABLES_ROUTES)
  },
  {
    path: 'reservaciones',
    loadChildren: () =>
      import('./reservaciones/reservaciones.routes').then(m => m.RESERVACIONES_ROUTES)
  },
  {
    path: 'calendario',
    loadChildren: () =>
      import('./calendario/calendario.routes').then(m => m.CALENDARIO_ROUTES)
  }
];
