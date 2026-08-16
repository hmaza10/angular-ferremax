import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap, map, shareReplay } from 'rxjs';
import { Productoservice } from '../productoservice';
import { Producto } from '../model/Producto';

@Component({
  selector: 'app-producto-detalle',
  imports: [CommonModule, RouterLink],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css',
})
export class ProductoDetalle {

  producto$: Observable<Producto>;
  similares$: Observable<Producto[]>;

  constructor(private route: ActivatedRoute, private productoservice: Productoservice) {

    this.producto$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.productoservice.buscarPorId(id).pipe(
          map(respuesta => respuesta.producto)
        );
      }),
      shareReplay(1)
    );

    this.similares$ = this.producto$.pipe(
      switchMap(producto =>
        this.productoservice.listar().pipe(
          map(productos => productos
            .filter(p => p.nombreCategoria === producto.nombreCategoria && p.idProducto !== producto.idProducto)
            .slice(0, 4)
          )
        )
      )
    );
  }
}