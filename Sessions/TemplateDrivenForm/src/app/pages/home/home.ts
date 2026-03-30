import { Component, ViewChild } from '@angular/core';
import { Form } from '../../components/form/form';

@Component({
  selector: 'app-home',
  imports: [Form],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  @ViewChild(Form) childFromComponent!: Form;

  setValue() {
    this.childFromComponent.setFormValue();
  }
  patchValue() {
    this.childFromComponent.patchFormValue();
  }
}
