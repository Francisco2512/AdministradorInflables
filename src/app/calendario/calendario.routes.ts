import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

export const CALENDARIO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./calendario.component').then(m => m.CalendarioComponent),
    canActivate: [authGuard] 
  }
];
