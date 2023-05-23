import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductData } from 'src/types/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<ProductData[]> {
    return this.httpClient.get<ProductData[]>('assets/data.json');
  }

  getProductById(id: number): Observable<ProductData | undefined> {
    return this.httpClient
      .get<ProductData[]>(`assets/data.json`)
      .pipe(map((products) => products.find((product) => product.id === id)));
  }
}
