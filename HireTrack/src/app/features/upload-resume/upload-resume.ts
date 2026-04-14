import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ResumeService } from '../../core/services/resume-service';
import { FileValidator } from '../../shared/validators/fileValidator';
import { Router } from '@angular/router';
import { ErrorService } from '../../core/services/error-service';

@Component({
  selector: 'app-upload-resume',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './upload-resume.html',
  styleUrl: './upload-resume.css',
})
export class UploadResume {
  constructor(
    private resumeService: ResumeService,
    private router: Router,
    private errorService: ErrorService,
  ) {}
  isBeingUploaded = signal<boolean>(false);

  form = new FormGroup({
    name: new FormControl(''),
    file: new FormControl<File | null>(null, [
      Validators.required,
      FileValidator,
    ]),
  });

  // Handle file selection
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.form.patchValue({ file });
    }
  }

  // Submit form
  upload() {
    this.isBeingUploaded.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, file } = this.form.value;

    if (!file) return;

    this.resumeService.uploadResume(file, name ? name : file.name).subscribe({
      next: (data) => {
        this.resumeService.addResume(data, file.name).subscribe({
          next: (data) => {
            this.errorService.setSuccessMessage(
              'Resume uploaded successfully.',
            );
          },
          error: (err) => {
            console.error(err);
          },
        });

        this.isBeingUploaded.set(false);
        this.form.reset();
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Upload failed', err);
        this.isBeingUploaded.set(false);
      },
    });
  }
}
