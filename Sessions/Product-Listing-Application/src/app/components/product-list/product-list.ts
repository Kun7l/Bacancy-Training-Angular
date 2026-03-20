import { Component, signal } from '@angular/core';
import { IProductDetails } from '../../types/product-type';
import { ProductItem } from "../product-item/product-item";
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
      hasDiscount: false
    },
    {
      name: 'Pen',
      price: 10,
      isInStock: true,
      hasDiscount: true
    },
    {
      name: 'Eraser',
      price: 15,
      isInStock: false,
      hasDiscount: false
    }
  ]);
}
