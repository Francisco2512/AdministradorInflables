import { Routes } from '@angular/router';

export const INFLABLES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./lista-inflables.component').then(m => m.ListaInflablesComponent)
  }
];