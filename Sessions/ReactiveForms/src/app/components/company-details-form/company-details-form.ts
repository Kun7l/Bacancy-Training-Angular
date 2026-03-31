import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-company-details-form',
  imports: [ReactiveFormsModule],
  templateUrl: './company-details-form.html',
  styleUrl: './company-details-form.css',
})
export class CompanyDetailsForm {
  projectDetails = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });
  companyForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    website: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    projects: new FormArray([this.projectDetails]),
  });

  onSubmit() {
    console.log('calling');
    console.log(this.companyForm);
  }

  get projects() {
    return this.companyForm.get('projects') as FormArray;
  }
  addProject() {
    this.projects.push(this.projectDetails);
  }
  removeProject(index: number) {
    this.projects.removeAt(index);
  }
}
