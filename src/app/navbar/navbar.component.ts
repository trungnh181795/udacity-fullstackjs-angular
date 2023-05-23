import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/types/cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() openCart: boolean = false;
  @Output() toggleCartEvent = new EventEmitter();
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService
      .getCartItems()
      .subscribe((items) => (this.cartItemCount = items.length));
  }

  toggleOpenCart(): void {
    this.toggleCartEvent.emit();
  }
}
