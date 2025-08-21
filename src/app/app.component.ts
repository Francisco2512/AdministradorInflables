import { Component } from '@angular/core';
import { Router, Event, NavigationEnd, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule, } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <app-navbar *ngIf="mostrarNavbar"></app-navbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  mostrarNavbar = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        this.mostrarNavbar = !event.urlAfterRedirects.includes('/login');
      });
  }
}

