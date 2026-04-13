import { Component, input, Input, output } from '@angular/core';
import { Job } from '../../../core/models/job.model';
import { Router, RouterLink } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { RelativeDatePipePipe } from '../../pipes/relative-date-pipe-pipe';
import { JobService } from '../../../core/services/job-service';
import { BadgeComponent } from '../badge/badge';

@Component({
  selector: 'app-hover-accordion',
  imports: [RouterLink, DatePipe, TitleCasePipe, RelativeDatePipePipe, BadgeComponent],
  templateUrl: './hover-accordion.html',
  styleUrl: './hover-accordion.css',
})
export class HoverAccordion {
  constructor(
    private router: Router,
    private jobService: JobService,
  ) {}
  jobDetails = input<Job | null>(null);
  deleteJobEvent = output<number>();

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

  deleteJob(id: number) {
    this.jobService.deleteJob(id).subscribe({
      next: () => {
        console.log('Job deleted successfully');
        // Optionally, you can emit an event or call a callback to refresh the job list in the parent component.
        this.deleteJobEvent.emit(id);
      },
      error: (err) => {
        console.error('Error deleting job:', err);
      },
    });
  }
}
