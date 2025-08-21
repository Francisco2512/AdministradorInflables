// import { Component } from '@angular/core';
// import { AuthService } from './login.service';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { signInWithEmailAndPassword } from 'firebase/auth';

// interface LoginUser {
//   email: string;
//   password: string;
//   phone?: string;
//   name?: string;
// }

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   user: LoginUser = {
//     email: "",
//     password: "",
//     phone: "",
//     name: ""
//   };

//   userCredentials: any;
//   emailSend: string = "";
// errorMessage: any;

//   constructor(private authService: AuthService, private route: Router) {}

//   login() {
//   if (!this.user.email || !this.user.password) {
//     this.errorMessage = "Debes ingresar correo y contraseña.";
//     return;
//   }

//   this.authService.login(this.user.email, this.user.password)
//     .then((cred) => {
//       console.log("Login exitoso", cred.user);
//       this.errorMessage = "";
//       // Redirigir a la lista de inflables o reservaciones
//       this.route.navigate(['/reservaciones']);
//     })
//     .catch((err) => {
//       console.error("Error al iniciar sesión:", err);
//       this.errorMessage = "Correo o contraseña incorrectos.";
//     });
// }
// }

// import { Component } from '@angular/core';
// import { AuthService } from './login.service';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// interface LoginUser {
//   email: string;
//   password: string;
// }

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   user: LoginUser = { email: '', password: '' };
//   errorMessage: string = '';

//   constructor(private authService: AuthService, private route: Router) {}

//   login() {
//     if (!this.user.email || !this.user.password) {
//       this.errorMessage = "Debes ingresar correo y contraseña.";
//       return;
//     }

//     this.authService.login(this.user.email, this.user.password)
//       .then(() => {
//         this.errorMessage = '';
//         this.route.navigate(['/reservaciones']); // o '/inflables'
//       })
//       .catch((err) => {
//         console.error("Error al iniciar sesión:", err);
//         this.errorMessage = "Correo o contraseña incorrectos.";
//       });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { AuthService } from './login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface LoginUser {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: LoginUser = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {

    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.router.navigate(['/reservaciones']);
      }
    });
  }

  async login() {
    if (!this.user.email || !this.user.password) {
      this.errorMessage = "Debes ingresar correo y contraseña.";
      return;
    }

    try {
      await this.authService.login(this.user.email, this.user.password);
      this.errorMessage = '';
      this.router.navigate(['/reservaciones']);
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      this.errorMessage = "Correo o contraseña incorrectos.";
    }
  }
}
