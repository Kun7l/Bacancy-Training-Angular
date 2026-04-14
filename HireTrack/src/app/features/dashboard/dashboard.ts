import { JsonPipe } from '@angular/common';
import {
  Component,
  computed,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  DestroyRef,
  inject
} from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { JobService } from '../../core/services/job-service';
import { Status } from '../../core/models/status';
import { Job } from '../../core/models/job.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HoverAccordion } from '../../shared/components/hover-accordion/hover-accordion';
import { SearchBar } from '../../shared/components/search-bar/search-bar';
import { StatsBar } from '../../shared/components/stats-bar/stats-bar';
import { Spinner } from '../../shared/components/loaders/spinner/spinner';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MessageService } from '../../core/services/messageService';

@Component({
  selector: 'app-dashboard',
  imports: [
    HoverAccordion,
    SearchBar,
    StatsBar,
    RouterLink,
    Spinner,
    DragDropModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  constructor(
    private authService: AuthService,
    private jobService: JobService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  private destroyRef = inject(DestroyRef);
  protected user = JSON.parse(localStorage.getItem('user')!);
  public jobList = signal<Job[] | undefined>(undefined);
  protected isLoading = signal(false);
  public jobCategory = signal({
    wishlist: [] as Job[],
    applied: [] as Job[],
    interview: [] as Job[],
    offer: [] as Job[],
  });

  protected statsBar = computed(() => {
    const jobs = this.jobList();
    if (!jobs) return null;
    const stats = {
      wishlist: 0,
      applied: 0,
      interview: 0,
      offer: 0,
    };
    for (const job of jobs) {
      switch (job.status) {
        case Status.wishlist:
          stats.wishlist++;
          break;
        case Status.applied:
          stats.applied++;
          break;
        case Status.interview:
          stats.interview++;
          break;
        case Status.offer:
          stats.offer++;
          break;
      }
    }
    return stats;
  });

  ngOnInit(): void {
    this.isLoading.set(true);
    this.jobService.getAllJobs().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => {
        this.jobList.set(data);
        this.categorizeJobs(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
      },
    });
  }

  categorizeJobs(jobs: Job[]) {
    this.jobCategory.set({
      wishlist: jobs.filter((j) => j.status === Status.wishlist),
      applied: jobs.filter((j) => j.status === Status.applied),
      interview: jobs.filter((j) => j.status === Status.interview),
      offer: jobs.filter((j) => j.status === Status.offer),
    });
  }

  onSearch(jobs: Job[]) {
    this.jobList.set(jobs);
    this.categorizeJobs(jobs);
  }

  deleteJobFromList(id: number) {
    const currentList = this.jobList();
    if (!currentList) return;
    this.jobList.set(currentList.filter((job) => job.id !== id));
    this.categorizeJobs(this.jobList()!);
  }

  drop(event: CdkDragDrop<any[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      const prevContainer = event.previousContainer.data;
      const currContainer = event.container.data;

      const prevIndex = event.previousIndex;
      const currIndex = event.currentIndex;

      const movedJob = prevContainer[prevIndex];

      const oldStatus = movedJob.status;

      transferArrayItem(prevContainer, currContainer, prevIndex, currIndex);

      movedJob.status = newStatus;
      this.jobList.set([...this.jobList()!]);

      this.jobService.updateJobStatus(movedJob.id, newStatus).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: () => {
          this.messageService.setSuccessMessage(
            'Job status updated successfully!',
          );
        },
        error: () => {
          transferArrayItem(
            currContainer,
            prevContainer,
            currIndex,
            prevIndex,
          );
          this.jobList()?.forEach((job) => {
            if (job.id === movedJob.id) {
              job.status = oldStatus;
            }
          });
          this.jobList.set([...this.jobList()!]);
          this.categorizeJobs(this.jobList()!);
          this.messageService.setDangerMessage('Failed to update job status');
        },
      });
    }
  }
}
