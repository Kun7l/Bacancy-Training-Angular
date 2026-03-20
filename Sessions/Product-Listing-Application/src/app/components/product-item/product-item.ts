import { Component, input } from '@angular/core';
import { IProductDetails } from '../../types/product-type';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  product = input<IProductDetails>();
}
