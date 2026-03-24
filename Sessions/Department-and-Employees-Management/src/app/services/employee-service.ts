import { Injectable, signal } from '@angular/core';
import { Employee } from '../employee.type';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  isActive = signal<boolean>(false);

  employees$ = new Subject<Employee>();

  addEmployee(name: string) {
    const newEmployee: Employee = {
      id: 2,
      name: name,
    };
    this.employees$.next(newEmployee);
  }

  getAll() {
    return this.employees$;
  }
}
