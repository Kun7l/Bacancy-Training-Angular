import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  JsonPipe,
  LowerCasePipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { Component } from '@angular/core';
import { AdharNumberMaskPipe } from '../../pipes/adhar-number-mask-pipe';
import { Observable, Subscription } from 'rxjs';
import { Employee } from '../../employee.type';
import { UserService } from '../../service/user-service';
import { AddressPipe } from '../../pipes/address-pipe';

@Component({
  selector: 'app-home',
  imports: [
    UpperCasePipe,
    DatePipe,
    TitleCasePipe,
    LowerCasePipe,
    AdharNumberMaskPipe,
    CurrencyPipe,
    AsyncPipe,
    AddressPipe,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private userService: UserService) {}

  employeeDetails: Employee[] = [];
  subscription: Subscription | undefined = undefined;
  timeObservable: Observable<string> | undefined = undefined;

  ngOnInit() {
    this.subscription = this.userService.getUsers().subscribe((data) => {
      this.employeeDetails = data;
    });
    this.timeObservable = this.userService.getTime();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
