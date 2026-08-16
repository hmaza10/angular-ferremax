import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Productoservice } from './productoservice';
import { Producto } from './model/Producto';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {

  todosLosProductos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  productosPagina: Producto[] = [];

  busqueda: string = '';
  paginaActual: number = 1;
  productosPorPagina: number = 10;
  totalPaginas: number = 1;

  cargando: boolean = true;

  constructor(private productoservice: Productoservice, private cdr: ChangeDetectorRef) {
    this.productoservice.listar().subscribe(productos => {
      this.todosLosProductos = productos;
      this.aplicarFiltro();
      this.cargando = false;
      this.cdr.detectChanges();
    });
  }

  aplicarFiltro() {
    const termino = this.busqueda.trim().toLowerCase();

    this.productosFiltrados = termino === ''
      ? this.todosLosProductos
      : this.todosLosProductos.filter(p =>
          p.nombre.toLowerCase().includes(termino) ||
          (p.descripcion && p.descripcion.toLowerCase().includes(termino))
        );

    this.totalPaginas = Math.max(1, Math.ceil(this.productosFiltrados.length / this.productosPorPagina));
    this.paginaActual = 1;
    this.actualizarPagina();
  }

  actualizarPagina() {
    const desde = (this.paginaActual - 1) * this.productosPorPagina;
    const hasta = desde + this.productosPorPagina;
    this.productosPagina = this.productosFiltrados.slice(desde, hasta);
  }

  irAPagina(n: number) {
    if (n < 1 || n > this.totalPaginas) return;
    this.paginaActual = n;
    this.actualizarPagina();
  }

  paginasArray(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }
}