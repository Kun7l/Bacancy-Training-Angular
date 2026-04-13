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
import { Router, RouterLink } from '@angular/router';
import { BackButton } from '../../shared/components/back-button/back-button';
import { PastDateValidator } from '../../shared/validators/pastDateValidator';
import { LoadingButton } from "../../shared/components/loaders/loading-button/loading-button";

@Component({
  selector: 'app-add-job',
  imports: [ReactiveFormsModule, BackButton, LoadingButton],
  templateUrl: './add-job.html',
  styleUrl: './add-job.css',
})
export class AddJob implements OnInit, OnDestroy {
  constructor(
    private resumeService: ResumeService,
    private jobService: JobService,
    private router: Router,
  ) {}

  protected resumeList = signal<Resume[] | null>(null);
  private isSaved = false;
  protected isBeingAdded = false;
  subscription: Subscription | undefined = undefined;

  isSavedFn(): boolean {
    return this.isSaved;
  }

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

  public addJobForm = new FormGroup({
    company: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    role: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    date_applied: new FormControl<string | null>(null, {
      validators: [PastDateValidator],
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
    this.isBeingAdded = true;
    this.isSaved = true;
    const formValue = this.addJobForm.getRawValue();
    const newJob: CreateJobDto = {
      ...formValue,
      job_url: formValue.job_url ?? undefined,
      note: formValue.note ?? undefined,
      resume_id: formValue.resume_id ?? undefined,
      last_edited: new Date(),
      date_applied: formValue.status === Status.wishlist ? undefined : formValue.date_applied ? new Date(formValue.date_applied) : new Date(),
    };
    this.jobService.addJob(newJob).subscribe({
      next: (data) => {
        console.log(data);
        this.isBeingAdded = false;
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
