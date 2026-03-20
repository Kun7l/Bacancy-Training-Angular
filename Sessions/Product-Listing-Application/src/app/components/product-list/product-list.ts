import { Component, signal } from '@angular/core';
import { IProductDetails } from '../../types/product-type';
import { ProductItem } from "../product-item/product-item";

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
      isInStock: true
    },
    {
      name: 'Pen',
      price: 10,
      isInStock: true
    },
    {
      name: 'Eraser',
      price: 15,
      isInStock: false
    }
  ]);
}
