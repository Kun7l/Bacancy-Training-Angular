import { Component, input, output } from '@angular/core';
import { IProductDetails } from '../../types/product-type';
import { AppHighlightDiscount } from '../../directives/app-highlight-discount';
import { AppHoverScale } from '../../directives/app-hover-scale';
import { AppStatusBorder } from '../../directives/app-status-border';
import { AppLoading } from "../../directives/app-loading";
import { AppIf } from '../../directives/app-if';


@Component({
  selector: 'app-product-item',
  imports: [AppHighlightDiscount, AppHoverScale, AppStatusBorder, AppLoading,AppIf],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  product = input<IProductDetails>();

  addProductEvent = output<IProductDetails>();

  addProduct(product: IProductDetails) {
    this.addProductEvent.emit(product);
  }
}
