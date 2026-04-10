import { Component, input, Input } from '@angular/core';
import { Job } from '../../../core/models/job.model';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-hover-accordion',
  imports: [RouterLink,DatePipe],
  templateUrl: './hover-accordion.html',
  styleUrl: './hover-accordion.css',
})
export class HoverAccordion {
  constructor(private router: Router) {}
  jobDetails = input<Job | null>(null);

  isExpanded = false;

  expand() {
    this.isExpanded = true;
  }

  collapse() {
    this.isExpanded = false;
  }

  move() {
    this.router.navigate(['/job', this.jobDetails()?.id]);
  }
}
