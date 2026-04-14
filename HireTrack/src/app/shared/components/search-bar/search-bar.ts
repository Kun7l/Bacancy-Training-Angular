import {
  Component,
  EventEmitter,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
  DestroyRef,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JobService } from '../../../core/services/job-service';
import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  Subject,
  switchMap,
} from 'rxjs';
import { Job } from '../../../core/models/job.model';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  @Output() searchResults = new EventEmitter<Job[]>();

  private searchSubject = new Subject<string>();
  private destroyRef = inject(DestroyRef);
  protected searchQuery = '';

  constructor(private jobService: JobService) {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          return this.jobService.searchJob(query);
        }),
        takeUntilDestroyed(this.destroyRef)
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
}
