import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/admin';

export interface ProductoStockBajo {
  idProducto: number;
  nombre: string;
  stockActual: number;
  stockMinimo: number;
}

export interface DashboardData {
  totalProductos: number;
  stockBajo: ProductoStockBajo[];
}

export interface AuditoriaItem {
  fecha: string;
  accion: string;
  entidad: string;
}

export interface PedidoResumen {
  idPedido: number;
  fechaPedido: string;
  nombreCliente: string;
  total: number;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class Adminservice {

  constructor(private http: HttpClient) { }

  dashboard(): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${API_URL}/dashboard`, { withCredentials: true });
  }

  auditoria(): Observable<{ auditorias: AuditoriaItem[] }> {
    return this.http.get<{ auditorias: AuditoriaItem[] }>(`${API_URL}/auditoria`, { withCredentials: true });
  }

  pedidos(): Observable<{ pedidos: PedidoResumen[] }> {
    return this.http.get<{ pedidos: PedidoResumen[] }>(`${API_URL}/pedidos`, { withCredentials: true });
  }

}
