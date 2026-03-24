import { Component, signal } from '@angular/core';
import { JobDetails } from '../../jobDetails.type';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-jobs',
  imports: [RouterLink],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css',
})
export class Jobs {
  jobList = signal<JobDetails[]>([
    {
      id: 0,
      role: 'Java developer',
      salary: 600000,
    },
    {
      id: 1,
      role: 'front end developer',
      salary: 10000,
    },
    {
      id: 2,
      role: 'Solution architect',
      salary: 5000,
    },
  ]);
}
