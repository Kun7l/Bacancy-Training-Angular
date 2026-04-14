import { Component, input, Input, output } from '@angular/core';
import { Job } from '../../../core/models/job.model';
import { Router, RouterLink } from '@angular/router';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { RelativeDatePipePipe } from '../../pipes/relative-date-pipe-pipe';
import { JobService } from '../../../core/services/job-service';
import { BadgeComponent } from '../badge/badge';
import { ErrorService } from '../../../core/services/error-service';
import { LoadingButton } from "../loaders/loading-button/loading-button";

@Component({
  selector: 'app-hover-accordion',
  imports: [
    RouterLink,
    DatePipe,
    TitleCasePipe,
    RelativeDatePipePipe,
    BadgeComponent,
    LoadingButton
],
  templateUrl: './hover-accordion.html',
  styleUrl: './hover-accordion.css',
})
export class HoverAccordion {
  constructor(
    private router: Router,
    private jobService: JobService,
    private errorService: ErrorService,
  ) {}
  jobDetails = input<Job | null>(null);
  deleteJobEvent = output<number>();

  isExpanded = false;
  isBeingDeleted = false;

  expand() {
    this.isExpanded = true;
  }

  collapse() {
    this.isExpanded = false;
  }

  move() {
    this.router.navigate(['/job', this.jobDetails()?.id]);
  }

  deleteJob(id: number) {
    this.isBeingDeleted = true;
    this.jobService.deleteJob(id).subscribe({
      next: () => {
        this.deleteJobEvent.emit(id);
        this.errorService.setInfoMessage('Job deleted successfully.');
        this.isBeingDeleted = false;
      },
      error: (err) => {
        console.error('Error deleting job:', err);
        this.isBeingDeleted = false;
      },
    });
  }
}
