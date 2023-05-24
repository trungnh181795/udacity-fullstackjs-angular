import { Injectable } from '@angular/core';
import { CartItem } from 'src/types/cart';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  private cartItems$ = this.cartItems.asObservable();

  constructor(private toastr: ToastrService) {
    this.cartItems.next(
      JSON.parse(localStorage.getItem('storefront-fe-cart') || '[]')
    );
  }

  getCartItems() {
    return this.cartItems$;
  }

  addItemToCart({ product, quantity }: CartItem): void {
    let existedItem = this.cartItems.value.find(
      (item) => item.product.id === product.id
    );

    if (existedItem) {
      existedItem.quantity += quantity;
    } else {
      this.cartItems.next([...this.cartItems.value, { product, quantity }]);
    }

    localStorage.setItem(
      'storefront-fe-cart',
      JSON.stringify(this.cartItems.value)
    );
    this.toastr.success(`${product.name} added to cart`, 'Success', {
      timeOut: 3000,
      newestOnTop: true,
      positionClass: 'cus-toast-top-right',

    });
  }

  removeItemFromCart(cartItem: CartItem): void {
    const newItems = this.cartItems.value.filter(
      (item) => item.product.id !== cartItem.product.id
    );
    this.cartItems.next(newItems);
    localStorage.setItem('storefront-fe-cart', JSON.stringify(newItems))
    this.toastr.success(
      `${cartItem.product.name} removed from cart`,
      'Success',
      {
        timeOut: 3000,
        positionClass: 'cus-toast-top-right',

      }
    );
  }

  clearCartItems() {
    this.cartItems.next([]);
    localStorage.setItem(
      'storefront-fe-cart',
      JSON.stringify(this.cartItems.value)
    );
    return this.cartItems.value;
  }

  changeItemQty(productId: number, quantity: number) {
    const newItems = this.cartItems.value.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: (item.quantity += quantity) }
        : item
    );
    this.cartItems.next(newItems);
    localStorage.setItem(
      'storefront-fe-cart',
      JSON.stringify(this.cartItems.value)
    );
    return this.cartItems.value;
  }
}
