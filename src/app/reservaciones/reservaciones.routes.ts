import { Routes } from '@angular/router';

export const RESERVACIONES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./reservaciones.component').then(m => m.ReservacionesComponent)
  }
];