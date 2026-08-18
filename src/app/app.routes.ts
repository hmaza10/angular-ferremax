import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Catalogo } from './catalogo/catalogo';
import { ProductoDetalle } from './catalogo/producto-detalle/producto-detalle';
import { Perfil } from './perfil/perfil';
import { AsesorIa } from './asesor-ia/asesor-ia';
import { Carrito } from './carrito/carrito';
import { Pago } from './checkout/pago/pago';
import { Confirmacion } from './checkout/confirmacion/confirmacion';
import { Dashboard } from './admin/dashboard/dashboard';
import { Personas } from './admin/personas/personas';
import { Auditoria } from './admin/auditoria/auditoria';
import { Pedidos } from './admin/pedidos/pedidos';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'inicio', component: Catalogo },
  { path: 'producto/:id', component: ProductoDetalle },
  { path: 'perfil', component: Perfil },
  { path: 'asesor-ia', component: AsesorIa },
  { path: 'carrito', component: Carrito },
  { path: 'checkout/pago', component: Pago },
  { path: 'checkout/confirmacion/:id', component: Confirmacion },
  { path: 'admin/panel', component: Dashboard },
  { path: 'admin/personas', component: Personas },
  { path: 'admin/auditoria', component: Auditoria },
  { path: 'admin/pedidos', component: Pedidos },
];
