import { Component, OnInit, signal, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Status } from '../../core/models/status';
import { ResumeService } from '../../core/services/resume-service';
import { Resume } from './types/resume.type';
import { JobService } from '../../core/services/job-service';
import { Job } from '../../core/models/job.model';
import { CreateJobDto } from '../../core/models/create.job.dto';
import { Router, RouterLink } from '@angular/router';
import { BackButton } from '../../shared/components/back-button/back-button';
import { PastDateValidator } from '../../shared/validators/pastDateValidator';
import { LoadingButton } from '../../shared/components/loaders/loading-button/loading-button';
import { MessageService } from '../../core/services/messageService';

@Component({
  selector: 'app-add-job',
  imports: [ReactiveFormsModule, BackButton, LoadingButton],
  templateUrl: './add-job.html',
  styleUrl: './add-job.css',
})
export class AddJob implements OnInit {
  constructor(
    private resumeService: ResumeService,
    private jobService: JobService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  protected isBeingAdded = signal(false);
  protected resumeList = signal<Resume[] | null>(null);
  private isSaved = false;
  private destroyRef = inject(DestroyRef);
  
  defaultJob = {
    company: 'Example Company',
    role: 'Example Role',
    status: Status.wishlist,
    job_url: 'https://example.com/job-posting',
    note: 'This is a note about the job.',
  };

  ngOnInit(): void {
    this.resumeService.getAllResume().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => {
        this.resumeList.set(data);
      },
      error: (err) => {
        console.error('Error fetching resumes:', err);
        this.isBeingAdded.set(false);
      },
    });
  }

  public isSavedFn(): boolean {
    return this.isSaved;
  }

  protected patchValue() {
    this.addJobForm.patchValue(this.defaultJob);
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

  protected onSubmit() {
    if (this.addJobForm.invalid) {
      this.addJobForm.markAllAsTouched();
      return;
    }
    this.isBeingAdded.set(true);
    this.isSaved = true;
    const formValue = this.addJobForm.getRawValue();
    const newJob: CreateJobDto = {
      ...formValue,
      job_url: formValue.job_url ?? undefined,
      note: formValue.note ?? undefined,
      resume_id: formValue.resume_id ?? undefined,
      last_edited: new Date(),
      date_applied:
        formValue.status === Status.wishlist
          ? undefined
          : formValue.date_applied
            ? new Date(formValue.date_applied)
            : new Date(),
    };
    
    this.jobService.addJob(newJob).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => {
        this.isBeingAdded.set(false);
        this.messageService.setSuccessMessage('Job added successfully!');
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        console.error('Error adding job:', err);
      },
    });
  }
}
