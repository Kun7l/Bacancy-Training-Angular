import { Component, signal } from '@angular/core';
import { IProductDetails } from '../../types/product-type';
import { ProductItem } from '../product-item/product-item';
import { AppHighlightDiscount } from '../../directives/app-highlight-discount';

@Component({
  selector: 'app-product-list',
  imports: [ProductItem],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  productList = signal<IProductDetails[]>([
    {
      name: 'Pencil',
      price: 8,
      isInStock: true,
      hasDiscount: false,
      stars: 2
    },
    {
      name: 'Pen',
      price: 10,
      isInStock: true,
      hasDiscount: true,
      stars: 3
    },
    {
      name: 'Eraser',
      price: 15,
      isInStock: false,
      hasDiscount: false,
      stars: 5
    },
  ]);

  cart = signal<IProductDetails[]>([]);

  addProduct(product: IProductDetails) {
    console.log(product);
    
    this.cart.update((cart) => [...cart, product]);
  }
}
