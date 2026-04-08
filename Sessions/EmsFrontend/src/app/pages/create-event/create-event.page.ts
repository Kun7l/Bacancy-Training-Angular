import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/event-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-event-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-event.page.html',
  styleUrl: './create-event.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEventPage {
  private readonly eventService = inject(EventService);

  protected readonly loading = signal(false);
  protected readonly successMessage = signal('');
  protected readonly errorMessage = signal('');

  protected readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    startDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    category: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    ticketPrice: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    const value = this.form.getRawValue();

    this.eventService
      .createEvent({
        name: value.name,
        startDate: value.startDate,
        category: value.category,
        ticketPrice: Number(value.ticketPrice),
      }).pipe(takeUntilDestroyed())
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.successMessage.set('Event created successfully.');
          this.form.reset({ name: '', startDate: '', category: '', ticketPrice: 0 });
        },
        error: () => {
          this.loading.set(false);
          this.errorMessage.set('Failed to create event. Make sure you are logged in as admin/organizer.');
        },
      });
  }
}