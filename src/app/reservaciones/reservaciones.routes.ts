import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

export const RESERVACIONES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./reservaciones.component').then(m => m.ReservacionesComponent),
    canActivate: [authGuard] 
  }
];
