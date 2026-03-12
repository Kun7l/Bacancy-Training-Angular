import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { ProductList } from "./product-list/product-list";
import { Footer } from "./footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ProductList, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = '04_simple_product_billing_system';
}
