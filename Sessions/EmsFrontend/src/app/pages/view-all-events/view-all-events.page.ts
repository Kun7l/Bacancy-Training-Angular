import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/event-service';
import { Subscription } from 'rxjs';
import { EventItem } from '../../types/event.type';

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

  subscription: Subscription | undefined = undefined;

  ngOnInit(): void {
    this.subscription = this.eventService.getAllEvents().subscribe({
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

  ngOnDestory() {
    this.subscription?.unsubscribe();
  }
}
