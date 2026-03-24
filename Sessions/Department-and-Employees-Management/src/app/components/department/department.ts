import { Component, input, signal } from '@angular/core';

import { EmployeeService } from '../../services/employee-service';
import { Employee } from '../../employee.type';
import { List } from "../list/list";

@Component({
  selector: 'app-department',
  imports: [List],
  templateUrl: './department.html',
  styleUrl: './department.css',
  providers: [EmployeeService],
})
export class Department {
  constructor(public empService: EmployeeService) {}

  deptName = input<string>();
  localEmployees = signal<Employee[]>([]);

  addEmployee(name: string) {
    this.empService.addEmployee(name);
  }

  ngOnInit() {
    this.empService.employees$.subscribe((emps) => {
      this.localEmployees.update((oldEmps)=>[...oldEmps,emps]);
    });
  }
}
