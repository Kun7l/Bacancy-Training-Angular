import {
  Component,
  EventEmitter,
  OnChanges,
  OnDestroy,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { JobService } from '../../../core/services/job-service';
import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { Job } from '../../../core/models/job.model';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar implements OnDestroy {
  @Output() searchResults = new EventEmitter<Job[]>();

  private searchSubject = new Subject<string>();
  private searchSubscription: Subscription | undefined = undefined;
  protected searchQuery = '';

  constructor(private jobService: JobService) {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          console.log('Fetching for:', query);
          return this.jobService.searchJob(query);
        }),
      )
      .subscribe({
        next: (results) => {
          this.searchResults.emit(results);
        },
        error: (err) => console.error('Search error:', err),
      });
  }

  onSearchChange(query: string) {
    this.searchSubject.next(query);
  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe();
  }
}
