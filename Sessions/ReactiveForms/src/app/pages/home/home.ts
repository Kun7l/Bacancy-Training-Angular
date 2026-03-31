import { Component } from '@angular/core';
import { CompanyDetailsForm } from "../../components/company-details-form/company-details-form";

@Component({
  selector: 'app-home',
  imports: [CompanyDetailsForm],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
