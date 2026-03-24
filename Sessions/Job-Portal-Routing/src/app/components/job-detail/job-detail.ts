import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobDetails } from '../../jobDetails.type';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.html',
  styleUrl: './job-detail.css',
})
export class JobDetail {
  private readonly route = inject(ActivatedRoute);

  private readonly jobList: JobDetails[] = [
    { id: 0, role: 'Java developer', salary: 600000 },
    { id: 1, role: 'front end developer', salary: 10000 },
    { id: 2, role: 'Solution architect', salary: 5000 },
  ];

  readonly jobId = computed(() => Number(this.route.snapshot.paramMap.get('id')));
  readonly selectedJob = computed(() =>
    this.jobList.find((job) => job.id === this.jobId())
  );
}
