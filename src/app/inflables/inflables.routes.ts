import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

export const INFLABLES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./lista-inflables.component').then(m => m.ListaInflablesComponent),
    canActivate: [authGuard]
  }
];