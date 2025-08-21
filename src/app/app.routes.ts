import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
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
