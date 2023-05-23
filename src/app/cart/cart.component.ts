import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from 'src/types/cart';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  validForm: boolean = true;

  checkoutForm = this.fb.group({
    name: ['', [Validators.required]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
        ),
      ],
    ],
    address: ['', [Validators.required]]
  })

  constructor(
    private cartService: CartService,
    private route: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cartService
      .getCartItems()
      .subscribe((items) => (this.cartItems = items));
  }

  getTotalPrice() {
    const total = this.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    return Math.round(total * 100) / 100;
  }

  onSubmit() {
    if (this.checkoutForm.invalid) {
      this.validForm = false;
      return;
    }
    this.validForm = true;
    this.cartService.clearCartItems()

    this.route.navigateByUrl('/success', {
      state: { from: 'checkout' },
    });
  }
}
