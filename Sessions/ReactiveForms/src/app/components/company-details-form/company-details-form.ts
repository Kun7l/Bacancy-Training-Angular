import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { phoneNumberValidator } from '../../validators/phoneNumberValidator';
import { duplicateProjectNameValidator } from '../../validators/duplicateProjectNameValidator';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-company-details-form',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './company-details-form.html',
  styleUrl: './company-details-form.css',
})
export class CompanyDetailsForm {
  submitted = false;
  submittedValue: unknown | null = null;

  private readonly defaultValue = {
    name: 'Bacancy Services',
    email: 'bacancy@gmail.com',
    website: 'www.bacancy.com',
    phone: '+91 9012345678',
    projects: [
      {
        name: '',
        description: '',
        startDate: '',
        endDate: '',
      },
    ],
  };
  companyForm = new FormGroup(
    {
      name: new FormControl(this.defaultValue.name, [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl(this.defaultValue.email, [
        Validators.required,
        Validators.email,
      ]),
      website: new FormControl(this.defaultValue.website, [
        Validators.required,
      ]),
      phone: new FormControl(this.defaultValue.phone, [
        Validators.required,
        phoneNumberValidator,
      ]),
      projects: new FormArray([this.createProjectFrom()]),
    },
    { validators: [duplicateProjectNameValidator] },
  );

  createProjectFrom() {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      return;
    }

    this.submittedValue = this.companyForm.getRawValue();
    this.companyForm.reset();
    this.companyForm.markAsUntouched();
    this.submitted = false;
    console.log('Company form submit:', this.submittedValue);
  }

  onReset() {
    this.submitted = false;
    this.submittedValue = null;

    this.projects.clear();
    this.projects.push(this.createProjectFrom());

    this.companyForm.reset(this.defaultValue);
    this.companyForm.markAsUntouched();
  }

  get projects() {
    return this.companyForm.get('projects') as FormArray;
  }

  addProject() {
    this.projects.push(this.createProjectFrom());
  }
  removeProject(index: number) {
    this.projects.removeAt(index);
  }

  hasError(control: AbstractControl | null, errorCode: string): boolean {
    if (!control) return false;
    return (control.touched || this.submitted) && control.hasError(errorCode);
  }

  hasProjectError(
    projectIndex: number,
    controlName: string,
    errorCode: string,
  ): boolean {
    const project = this.projects.at(projectIndex) as FormGroup | null;
    const control = project?.get(controlName) ?? null;

    if (!control) return false;

    return (control.touched || control.dirty) && control.hasError(errorCode);
  }
}
