import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/types/cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    console.log('item', this.cartItem);
  }

  changeItemQty(productId: number, quantity: number): void {
    this.cartService.changeItemQty(productId, quantity);
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartService.removeItemFromCart(cartItem);
  }

  handleInputChange(event: Event) {
    console.log('event', event);
  }

  handleBtnClick(action: 'dec' | 'inc') {
    if (this.cartItem) {
      switch (action) {
        case 'dec':
          this.changeItemQty(this.cartItem?.product.id, -1);
          break;
        case 'inc':
          this.changeItemQty(this.cartItem?.product.id, 1);
          break;
        default:
          return;
      }
    }
  }

  getFinalPrice() {
    if (this.cartItem) {
      return Math.round(this.cartItem.product.price * this.cartItem.quantity * 100) / 100
    }

    return ''
  }
}
