import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Authservice } from '../authservice';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  usuario: string = '';
  password: string = '';
  mensajeError: string = '';
  cargando: boolean = false;

  constructor(private authservice: Authservice, private router: Router) { }

  onSubmit() {
    this.mensajeError = '';
    this.cargando = true;

    this.authservice.login(this.usuario, this.password).subscribe({
      next: (respuesta) => {
        this.cargando = false;
        console.log('Login exitoso', respuesta.usuario);

        // Redirige segun el rol del usuario
        if (respuesta.usuario.roles.includes('ADMIN')) {
          this.router.navigate(['/admin']);
        } else if (respuesta.usuario.roles.includes('EMPLEADO')) {
          this.router.navigate(['/empleado']);
        } else {
          this.router.navigate(['/inicio']);
        }
      },
      error: (err) => {
        this.cargando = false;
        this.mensajeError = err.error?.mensaje || 'Error al iniciar sesión';
      }
    });
  }

}
