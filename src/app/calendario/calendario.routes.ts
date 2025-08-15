import { Routes } from '@angular/router';

export const CALENDARIO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./calendario.component').then(m => m.CalendarioComponent)
  }
];