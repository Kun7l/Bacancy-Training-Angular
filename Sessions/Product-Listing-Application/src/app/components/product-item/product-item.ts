import { Component, input } from '@angular/core';
import { IProductDetails } from '../../types/product-type';
import { AppHighlightDiscount } from '../../directives/app-highlight-discount';

@Component({
  selector: 'app-product-item',
  imports: [AppHighlightDiscount],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  product = input<IProductDetails>();
}
