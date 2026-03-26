import { Component, signal } from '@angular/core';
import { Product } from '../product.type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  productList = signal<Product[]>([
    {
      id: 0,
      name: 'Product A',
      price: 100,
      quantity: 0,
    },
    {
      id: 1,
      name: 'Product B',
      price: 200,
      quantity: 0,
    },
  ]);

  isGenerated = signal(false);
  totalPrice = signal(0);
  generateBill() {
    this.isGenerated.set(true);
    this.totalPrice.set(this.calculateTotal());
  }
  calculateTotal() {
    const products = this.productList();
    let totalValue = 0;

    for (let index = 0; index < products.length; index++) {
      const product = products[index];
      // Total for each product is price * quantity
      totalValue += product.price * product.quantity;
    }

    return totalValue;
  }
}
