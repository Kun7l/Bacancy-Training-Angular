import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Status } from '../../core/models/status';
import { ResumeService } from '../../core/services/resume-service';
import { Subscription } from 'rxjs';
import { Resume } from './types/resume.type';
import { JobService } from '../../core/services/job-service';
import { Job } from '../../core/models/job.model';
import { CreateJobDto } from '../../core/models/create.job.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-job',
  imports: [ReactiveFormsModule],
  templateUrl: './add-job.html',
  styleUrl: './add-job.css',
})
export class AddJob implements OnInit, OnDestroy {
  constructor(
    private resumeService: ResumeService,
    private jobService: JobService,
    private router:Router
  ) {}

  subscription: Subscription | undefined = undefined;
  protected resumeList = signal<Resume[] | null>(null);

  defaultJob = {
    company: 'Example Company',
    role: 'Example Role',
    status: Status.wishlist,
    job_url: 'https://example.com/job-posting',
    note: 'This is a note about the job.',
  };
  patchValue() {
    this.addJobForm.patchValue(this.defaultJob);
  }

  ngOnInit(): void {
    this.subscription = this.resumeService.getAllResume().subscribe({
      next: (data) => {
        console.log(data);
        this.resumeList.set(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  protected addJobForm = new FormGroup({
    company: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    role: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    status: new FormControl<Status>(Status.wishlist, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    job_url: new FormControl(''),
    note: new FormControl(''),
    resume_id: new FormControl(undefined),
  });

  onSubmit() {
    if (this.addJobForm.invalid) {
      this.addJobForm.markAllAsTouched();
      return;
    }
    const formValue = this.addJobForm.getRawValue();
    const newJob: CreateJobDto = {
      ...formValue,
      job_url: formValue.job_url ?? undefined,
      note: formValue.note ?? undefined,
      resume_id: formValue.resume_id ?? undefined,
    };
    this.jobService.addJob(newJob).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['dashboard']);

      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
