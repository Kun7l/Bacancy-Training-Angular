import { Injectable, signal } from '@angular/core';
import { Employee } from '../employee.type';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  isActive = signal<boolean>(false);

   employees$ = new BehaviorSubject<Employee[]>([]);

  addEmployee(name: string) {
    
    const currentEmployees = this.employees$.value;
    const newEmployee: Employee = {
      id: currentEmployees.length,
      name: name,
    };
    this.employees$.next([...currentEmployees,newEmployee])
  }
}
