import { Component, input, Input, output, signal, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Job } from '../../../core/models/job.model';
import { Router, RouterLink } from '@angular/router';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { RelativeDatePipePipe } from '../../pipes/relative-date-pipe-pipe';
import { JobService } from '../../../core/services/job-service';
import { BadgeComponent } from '../badge/badge';
import { LoadingButton } from "../loaders/loading-button/loading-button";
import { MessageService } from '../../../core/services/messageService';

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
    private messageService: MessageService,
  ) {}
  public jobDetails = input<Job | null>(null);
  public deleteJobEvent = output<number>();

  protected isExpanded = signal(false);
  protected isBeingDeleted = signal(false);
  private destroyRef = inject(DestroyRef);

  expand() {
    this.isExpanded.set(true);
  }

  collapse() {
    this.isExpanded.set(false);
  }

  deleteJob(id: number) {
    this.isBeingDeleted.set(true);
    this.jobService.deleteJob(id).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.deleteJobEvent.emit(id);
        this.messageService.setInfoMessage('Job deleted successfully.');
        this.isBeingDeleted.set(false);
      },
      error: (err) => {
        console.error('Error deleting job:', err);
        this.isBeingDeleted.set(false);
      },
    });
  }
}
