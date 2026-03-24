import { Injectable, signal } from '@angular/core';
import { Employee } from '../employee.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  department$ = new BehaviorSubject<string[]>(['.Net','Angular','React']);

  addDepartment(name: string) {
    const currentDepartments = this.department$.value;
    this.department$.next([...currentDepartments, name]);
  }
}
