import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  imports: [],
  templateUrl: './back-button.html',
  styleUrl: './back-button.css',
})
export class BackButton {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
