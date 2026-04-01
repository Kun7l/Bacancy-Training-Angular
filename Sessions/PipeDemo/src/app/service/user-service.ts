import { Injectable, signal } from '@angular/core';
import { Employee } from '../employee.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userList = signal<Employee[]>([
    {
      name: 'John Doe',
      dateOfJoining: new Date('2020-01-15'),
      salary: 50000,
      email: 'johndoe@gmail.com',
      department: 'Engineering',
      description: 'A skilled software engineer with 5 years of experience.',
      adharNumber: 123456789012,
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA',
      },
    },
    {
      name: 'Jane Smith',
      dateOfJoining: new Date('2019-03-10'),
      salary: 60000,
      email: 'janesmith@gmail.com',
      department: 'Marketing',
      description: 'An experienced marketing manager with a proven track record.',
      adharNumber: 987654321012,
      address: {
        street: '456 Elm St',
        city: 'Los Angeles',
        country: 'USA',
      },
    },
    {
      name: 'Alice Johnson',
      dateOfJoining: new Date('2021-06-20'),
      salary: 55000,
      email: 'alice@gmail.com',
      department: 'Human Resources',
      description: 'A dedicated HR specialist with expertise in employee relations.',
      adharNumber: 123456789012,
      address: {
        street: '789 Oak St',
        city: 'Chicago',
        country: 'USA',
      },
    },
  ]);

  getUsers() {
    const user$ = new Observable<Employee[]>((observer) => {
      observer.next(this.userList());
      observer.complete();
    });
    return user$;
  }
  getTime(): Observable<string> {
    return new Observable((observer) => {
      setInterval(() => {
        observer.next(new Date().toLocaleTimeString());
      }, 1000);
    });
  }
}
