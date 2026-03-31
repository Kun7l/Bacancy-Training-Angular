import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  LowerCasePipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { Component } from '@angular/core';
import { email } from '@angular/forms/signals';
import { AdharNumberMaskPipe } from '../../pipes/adhar-number-mask-pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    UpperCasePipe,
    DatePipe,
    TitleCasePipe,
    SlicePipe,
    LowerCasePipe,
    AdharNumberMaskPipe,
    CurrencyPipe,
    AsyncPipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  employeeDetails = {
    name: 'john doe',
    dateOfJoining: new Date(1990, 5, 15),
    salary: 50000,
    email: 'johndoe@gmail.com',
    department: 'software development',
    description: 'john is a software developer with 5 years of experience in angular development.',
    adharNumber: 123456789012,
    address: '123 main street, city, country',
  };
  time = new Observable((observer) => {
    setInterval(() => {
      observer.next(new Date().toLocaleTimeString());
    }, 1000);
  });
}
