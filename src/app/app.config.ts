import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import  {routes}  from './app.routes';
export const appConfig = [
  provideRouter(routes),
  provideHttpClient(),
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideFirestore(() => getFirestore()),
];
