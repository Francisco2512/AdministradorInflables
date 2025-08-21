import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListaInflablesComponent } from './inflables/lista-inflables.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'reservaciones', component: ListaInflablesComponent },
  { path: '**', redirectTo: '/login' }
];