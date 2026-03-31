import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  @ViewChild('tdForm') userForm!: NgForm;

  submittedDetails = null;
  isSubmitted = false;
  defaultFirstName = signal('Goblin');
  defaultLastName = signal('Nakul');

  onSubmit(form: NgForm) {
    this.submittedDetails = { ...form.value };
    console.log(form);
    // form.reset();
    this.isSubmitted = true;
  }

  onReset() {
    if (this.isSubmitted) {
      this.submittedDetails = null;
      this.userForm.reset();
      this.isSubmitted = false;
    } else {
      return;
    }
  }

  setFormValue() {
    this.userForm.form.setValue({
      nameGroup: {
        firstName: 'Krunal',
        lastName: 'Khairanar',
      },
      email: 'kunal@bacancy.com',
      phoneNumber: 1234567890,
      password: '123456',
      gender: 'male',
      address: {
        streetAddress: '123 Maple Street',
        city: 'ahmedabad',
        pincode: 12345,
      },
      rememberMe: true,
    });
  }

  patchFormValue() {
    this.userForm.form.patchValue({
      nameGroup: {
        firstName: 'Goblin',
        lastName: 'Nakul',
      },
    });
  }
}
