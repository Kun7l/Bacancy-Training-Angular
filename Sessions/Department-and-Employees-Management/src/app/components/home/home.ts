import { Component, OnDestroy } from '@angular/core';
import { Department } from '../department/department';
import { DepartmentService } from '../../services/department-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [Department],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [DepartmentService],
})
export class Home implements OnDestroy {
  localDepartments: string[] = [];
  constructor(public deptService: DepartmentService) {}

  subcription!: Subscription;

  addButtonClick(name: string) {
    if (!name) {
      alert('Please enter department name');
      return;
    }
    this.deptService.addDepartment(name);
  }
  ngOnInit() {
    this.subcription = this.deptService.department$.subscribe((deps) => {
      this.localDepartments = deps;
    });
  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
