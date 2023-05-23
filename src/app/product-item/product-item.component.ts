import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from 'src/types/cart';
import { ProductData } from 'src/types/products';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product: ProductData | null

  constructor (private cartService: CartService) {
    this.product = null
  }

  addToCart() {
    if (this.product) {
      this.cartService.addItemToCart({
        quantity: 1,
        product: this.product
      })
    }
  }
}
