import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Catalogo } from './catalogo/catalogo';
import { ProductoDetalle } from './catalogo/producto-detalle/producto-detalle';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'inicio', component: Catalogo },
  { path: 'producto/:id', component: ProductoDetalle },
];
