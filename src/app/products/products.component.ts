import { Component, OnInit } from '@angular/core';
import { ProductData } from 'src/types/products';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: ProductData[] = [];

  constructor(private productsService: ProductsService) { }

  async ngOnInit(): Promise<void> {
      this.productsService.getProducts().subscribe((data) => {
        this.products = data;
      });
  }
}
