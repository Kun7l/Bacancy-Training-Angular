import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Job } from '../../core/models/job.model';
import { Status } from '../../core/models/status';
import { PastDateValidator } from '../../shared/validators/pastDateValidator';
import { CreateJobDto } from '../../core/models/create.job.dto';
import { JobService } from '../../core/services/job-service';
import { ErrorService } from '../../core/services/error-service';

@Component({
  selector: 'app-edit-job',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-job.html',
  styleUrl: './edit-job.css',
})
export class EditJob {
  constructor(private jobService: JobService,private errorService: ErrorService) {
    effect(() => {
      const job = this.jobData();
      if (!job) return;

      this.editJobForm.setValue({
        company: job.company,
        role: job.role,
        date_applied: this.toDateInputValue(job.created_at),
        status: job.status,
        job_url: job.job_url ?? '',
        note: job.note ?? '',
        resume_id: job.resume_id ?? null,
      });
    });
  }

  jobData = input<Job | null>(null);
  jobEdited = output<Job>();

  editJobForm = new FormGroup({
    company: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    role: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    date_applied: new FormControl<string | null>(null, {
      validators: [Validators.required, PastDateValidator],
    }),
    status: new FormControl<Status>(Status.wishlist, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    job_url: new FormControl(''),
    note: new FormControl(''),
    resume_id: new FormControl<number | null>(null),
  });

  onSubmit() {
    if (this.editJobForm.invalid) {
      this.editJobForm.markAllAsTouched();
      return;
    }

    const currentJob = this.jobData();
    if (!currentJob) return;

    const formValue = this.editJobForm.getRawValue();
    const payload: CreateJobDto = {
      company: formValue.company!,
      role: formValue.role!,
      status: formValue.status!,
      date_applied: new Date(formValue.date_applied!),
      last_edited: new Date(),
      job_url: formValue.job_url || undefined,
      note: formValue.note || undefined,
      resume_id: formValue.resume_id ?? undefined,
    };

    this.jobService.updateJob(currentJob.id, payload).subscribe({
      next: () => {
        this.jobEdited.emit({
          ...currentJob,
          ...payload,
          created_at: payload.date_applied ?? currentJob.created_at,
        });
        this.errorService.setInfoMessage('Job updated successfully.');
      },
      error: (err) => {
        console.error('Error updating job:', err);
      },
    });
  }

  private toDateInputValue(value: Date | string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '';
    }
    return date.toISOString().split('T')[0];
  }
}
