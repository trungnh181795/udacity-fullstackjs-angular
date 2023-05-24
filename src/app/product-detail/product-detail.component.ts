import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ProductData } from 'src/types/products';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product?: ProductData;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productsService
      .getProductById(id)
      .subscribe((product) => (this.product = product));
  }

  updateQty(quantity: number): void {
    if (this.quantity + quantity > 0) {
      this.quantity += quantity
    }
  }

  setQty(quantity: number): void {
    this.quantity = quantity
  }

  addToCart() {
    this.cartService.addItemToCart({
      product: this.product!,
      quantity: this.quantity,
    });
  }
}
