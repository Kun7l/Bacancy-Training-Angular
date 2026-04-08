import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { phoneNumberValidator } from '../../validators/phoneNumberValidator';
import { duplicateProjectNameValidator } from '../../validators/duplicateProjectNameValidator';
import { JsonPipe } from '@angular/common';
import { Error } from '../error/error';
import { ErrorService } from '../../services/error-service';
import { dateValidator } from '../../validators/dateValidator';
import { websiteValidator } from '../../validators/websiteValidator';

@Component({
  selector: 'app-company-details-form',
  imports: [ReactiveFormsModule, JsonPipe, Error],
  templateUrl: './company-details-form.html',
  styleUrl: './company-details-form.css',
})
export class CompanyDetailsForm {
  constructor(private errorService: ErrorService) {}

  submitted = false;
  submittedValue: unknown | null = null;
  private projectsValueChangeSubscription?: Subscription;

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

  ngOnInit() {
    this.applyDuplicateNameValidation();
    this.projectsValueChangeSubscription = this.projects.valueChanges.subscribe(() => {
      this.revalidateProjectNames();
    });
  }

  ngOnDestroy() {
    this.projectsValueChangeSubscription?.unsubscribe();
  }

  companyForm = new FormGroup({
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
      websiteValidator,
    ]),
    phone: new FormControl(this.defaultValue.phone, [
      Validators.required,
      phoneNumberValidator,
    ]),
    projects: new FormArray([this.createProjectFrom()]),
  });

  createProjectFrom() {
    return new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
        ]),
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
      },
      { validators: [dateValidator] },
    );
  }

  get projects() {
    return this.companyForm.get('projects') as FormArray;
  }
  addProject() {
    const newProject = this.createProjectFrom();

    this.projects.push(newProject);
    this.applyDuplicateNameValidation();
  }
  removeProject(index: number) {
    this.projects.removeAt(index);
    this.revalidateProjectNames();
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
    this.applyDuplicateNameValidation();

    this.companyForm.reset(this.defaultValue);
    this.companyForm.markAsUntouched();
  }

  getErrorMessage(control: AbstractControl, errorCode: string): string | null {
    return this.errorService.hasError(control, this.submitted, errorCode);
  }

  private applyDuplicateNameValidation() {
    this.projects.controls.forEach((project) => {
      const nameControl = project.get('name');
      if (!nameControl) return;

      nameControl.setValidators([
        Validators.required,
        Validators.minLength(5),
        duplicateProjectNameValidator(this.projects),
      ]);
    });

    this.revalidateProjectNames();
  }

  private revalidateProjectNames() {
    this.projects.controls.forEach((project) => {
      const nameControl = project.get('name');
      nameControl?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    });
  }
}
