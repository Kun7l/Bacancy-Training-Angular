import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventItem, EventService } from '../../services/event-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-view-all-events-page',
  imports: [RouterLink],
  templateUrl: './view-all-events.page.html',
  styleUrl: './view-all-events.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewAllEventsPage implements OnInit {
  private readonly eventService = inject(EventService);

  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly events = signal<EventItem[]>([]);

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events.set(data ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load events from backend.');
        this.loading.set(false);
      },
    });
  }
}