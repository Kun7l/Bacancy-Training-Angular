import { Component, signal } from '@angular/core';
import { Employee } from '../../employee.type';
import { EmployeeService } from '../../services/employee-service';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  constructor(private empService:EmployeeService){}
  listItems : Employee = {
    id: 0,
    name: ''
  };

  onButtonClick(){
    this.empService.employees$.subscribe((emps)=>{
      this.listItems = emps;
    })
  }
}
