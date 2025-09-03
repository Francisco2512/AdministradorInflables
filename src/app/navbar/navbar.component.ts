import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../login/login.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  template: `
<nav class="navbar">
  <div class="navbar-container">
    <div class="nav-left-wrapper">
      
      <a class="logo" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
        <img src="/assets/logo.png" class="logo-img" />
      </a>

   
      <button class="hamburguesa" (click)="toggleMenu()">
        <i class="bi" [ngClass]="menuAbierto ? 'bi-x-lg' : 'bi-list'"></i>
      </button>

     
      <div class="nav-left" [ngClass]="{'open': menuAbierto}">
        <a routerLink="/calendario" routerLinkActive="active"> <i class="bi bi-calendar-event"></i> Calendario </a>
        <a routerLink="/reservaciones" routerLinkActive="active"> <i class="bi bi-journal-check"></i> Reservaciones </a>
        <a routerLink="/inflables" routerLinkActive="active"> <i class="bi bi-geo-alt"></i> Gestión de Inflables </a>
      </div>
    </div>
</div>
    
    <div class="nav-right">
      <a (click)="logout()">
        <i class="bi bi-box-arrow-right"></i>
      </a>
    
  </div>
</nav>
  `,styles: [`
.logo {
  display: flex;
  align-items: center;
  justify-content: center; 
  margin: 0;                   
  padding: 4px 8px;         
  background-color: rgba(255, 255, 255, 0.1); 
  border-radius: 12px;        
  transition: background-color 0.3s, transform 0.3s;
}

.logo:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.logo-img {
  height: 80px;  
  width: auto;       
  object-fit: contain;
  display: block;
}


.navbar {
  background-color: #B875F7;
  padding: 1rem 4rem;
  color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}

.navbar-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between; 
  padding: 0 1rem;
}
.logo-img {
  height: clamp(40px, 10vw, 80px); 
  width: auto;
  object-fit: contain;
}

.nav-left-wrapper {
  display: flex;
  align-items: center;
  gap: 2rem; 
}

.nav-left {
  display: flex; 
  gap: 1rem;
}

.nav-left a {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 10px 20px;      
  border-radius: 12px;     
  font-size: 18px;        
  font-weight: 900;
  background-color: rgba(255,255,255,0.1); 
  color: white;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;
}

.nav-left a:hover,
.nav-left a.active {
  background-color: rgba(255,255,255,0.2);
  transform: scale(1.05);
}

.nav-right a {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 10px 20px;      
  border-radius: 12px;    
  font-size: 18px;         
  font-weight: 900;
  background-color: rgba(255,255,255,0.1); 
  color: white;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;
}

.nav-right a:hover {
  background-color: rgba(255,255,255,0.2);
  transform: scale(1.05);
}


.hamburguesa {
  display: none; 
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}


@media (max-width: 768px) {
  .hamburguesa {
    display: block; 
  }
@media (max-width: 768px) {
  .nav-left a {
    width: 100%;              
    justify-content: center; 
    text-align: center;       
    padding: 18px;          
    font-size: 12px;          
  }
}
  .nav-left {
    display: none; 
    flex-direction: column;
    gap: 1rem;
    position: absolute; 
    top: 70px; 
    left: 0;
    right: 0;
    background-color: #B875F7;
    padding: 1rem;
    border-radius: 0 0 12px 12px;
    z-index: 100; 
  }

  .nav-left.open {
    display: flex; 
  }

  .navbar-container {
    position: relative;
  }
}
`]
})
export class NavbarComponent implements OnInit {
  menuAbierto = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuAbierto = false;
      }
    });
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }
}