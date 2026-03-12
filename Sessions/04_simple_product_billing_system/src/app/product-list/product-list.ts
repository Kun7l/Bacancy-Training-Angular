import { Component, computed, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  productAPrice = signal(100);
  productBPrice = signal(200);
  productCPrice = signal(50);

  productAQuantity = signal(1);
  productBQuantity = signal(1);
  productCQuantity = signal(1);

  increment(quantitySignal : WritableSignal<number>){
    quantitySignal.update(quantity => quantity + 1);
    this.isGenerated.set(false);
  }
  
  isGenerated = signal(false);

   totalPrice = computed(() => {
    return (this.productAPrice() * this.productAQuantity()) + 
           (this.productBPrice() * this.productBQuantity()) + 
           (this.productCPrice() * this.productCQuantity());
  });
}

