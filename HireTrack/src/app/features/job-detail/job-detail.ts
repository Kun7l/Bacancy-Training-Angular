import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { JobService } from '../../core/services/job-service';
import { Job } from '../../core/models/job.model';
import { EditJob } from '../edit-job/edit-job';
import { BadgeComponent } from '../../shared/components/badge/badge';
import { Spinner } from "../../shared/components/loaders/spinner/spinner";
import { RelativeDatePipePipe } from '../../shared/pipes/relative-date-pipe-pipe';

@Component({
  selector: 'app-job-detail',
  imports: [EditJob, RouterLink, BadgeComponent, Spinner, RelativeDatePipePipe, DatePipe],
  templateUrl: './job-detail.html',
  styleUrl: './job-detail.css',
})
export class JobDetail implements OnInit {
  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
  ) { }

  jobDetail = signal<Job | null>(null);
  isBeingEdited = signal(false);

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.jobService.getJobById(Number(jobId)).subscribe({
        next: (job) => {
          this.jobDetail.set(job);
          console.log(this.jobDetail());
        },
        error: (err) => {
          console.error('Error fetching job details:', err);
        },
      });
    }
  }

  onJobEdited(updatedJob: Job) {
    this.jobDetail.set(updatedJob);
    this.isBeingEdited.set(false);
  }
}
