import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
<nav class="navbar">
  <div class="container">
    <a class="logo" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
      <img src="/assets/logo.png"  class="logo-img" />
    </a>
    <ul class="nav-links">
      <li routerLinkActive="active">
        <a routerLink="/calendario">Calendario</a>
      </li>
      <li routerLinkActive="active">
        <a routerLink="/reservaciones">Reservaciones</a>
      </li>
      <li routerLinkActive="active">
        <a routerLink="/inflables">Gestión de Inflables</a>
      </li>
    </ul>
  </div>
</nav>

  `,styles: [`
  .logo-img {
    height: 160px;
    width: auto;
    display: flex;
    align-items: center;
    margin-right: auto;
    
  }

  .navbar {
    background-color: #007bff;
    padding: 1rem 4rem;
    color: white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  }

  .container {
    max-width: 1200px; /* más espacio si quieres navbar más ancho */
    margin: 0 auto; 
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-weight: bold;
    font-size: 2rem; /* un poco más grande */
    color: white;
    text-decoration: none;
  }

  .nav-links {
    list-style: none;
    display: flex;
    gap: 3rem; /* ligeramente menos para equilibrio */
    margin: 0;
    padding: 0;
  }

  .nav-links li a {
    color: white;
    text-decoration: none;
    font-weight: 900; /* más pesado */
    transition: color 0.3s ease, transform 0.3s ease;
    font-size: 22px; /* más grande para destacar */
  }

  .nav-links li a:hover,
  .nav-links li a.active {
    color: #ffc107;
    transform: scale(1.1); /* pequeño efecto al pasar el mouse */
  }

  /* Responsive: ajusta el tamaño en pantallas pequeñas */
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      padding: 1rem 2rem;
    }

    .nav-links {
      gap: 1.5rem;
      flex-direction: column;
      align-items: center;
    }

    .nav-links li a {
      font-size: 18px;
    }

    .logo {
      font-size: 1.5rem;
    }
  }
`]
})
export class NavbarComponent {}
//   styles: [`
//     .logo-img {
//       height: 160px;
//       width: auto;
//       display: flex;
//       margin-right: auto;
//       align-items: center;
//       margin-right: auto;
//     }
//     .navbar {
//   background-color: #007bff;
//   padding: 1rem 4rem;
//   color: white;
//   box-shadow: 0 2px 5px rgba(0,0,0,0.15);
//     }
//     .container {
//   max-width: 800px;
//   margin: 0; 
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// }
//     .logo {
//       font-weight: bold;
//       font-size: 1.8rem;
//       color: white;
//       text-decoration: none;
//     }
//     .nav-links {
//       list-style: none;
//       display: flex;
//       gap: 3.5rem;
//       margin: 0;
//       padding: 0;
//     }
//     .nav-links li a {
//       color: white;
//       text-decoration: none;
//       font-weight: 800;
//       transition: color 0.3s ease;
//       font-size: 20px;
//     }
//     .nav-links li a.active,
//     .nav-links li a:hover {
//       color: #ffc107;
//     }
//   `]