import { Component, input, OnDestroy } from '@angular/core';

import { EmployeeService } from '../../services/employee-service';
import { Employee } from '../../employee.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-department',
  imports: [],
  templateUrl: './department.html',
  styleUrl: './department.css',
  providers: [EmployeeService],
})
export class Department implements OnDestroy {
  constructor(public empService: EmployeeService) {}

  subcription!: Subscription;

  deptName = input<string>();
  localEmployees: Employee[] = [];

  addEmployee(name: string) {
    if (!name) {
      alert('Please enter employee name');
      return;
    }
    this.empService.addEmployee(name);
  }

  ngOnInit() {
    this.subcription = this.empService.employees$.subscribe((emps) => {
      this.localEmployees = emps;
      console.log('Emps' + emps);
    });
  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
