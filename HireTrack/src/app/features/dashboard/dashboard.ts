import { JsonPipe } from '@angular/common';
import {
  Component,
  computed,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { JobService } from '../../core/services/job-service';
import { Status } from '../../core/models/status';
import { Job } from '../../core/models/job.model';
import { Subscription } from 'rxjs';
import { HoverAccordion } from '../../shared/components/hover-accordion/hover-accordion';
import { SearchBar } from '../../shared/components/search-bar/search-bar';
import { StatsBar } from '../../shared/components/stats-bar/stats-bar';
import { UploadResume } from '../upload-resume/upload-resume';
import { LoadingButton } from '../../shared/components/loaders/loading-button/loading-button';
import { Spinner } from '../../shared/components/loaders/spinner/spinner';
import { Navbar } from '../../shared/components/navbar/navbar';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ErrorService } from '../../core/services/error-service';
import { StatusColorDirective } from "../../shared/directives/status-color-directive";
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
export class Dashboard implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private jobService: JobService,
    private router: Router,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {
    this.isLoading.set(true);
    this.subcription = this.jobService.getAllJobs().subscribe({
      next: (data) => {
        this.jobList.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
      }
    });
  }
  ngOnDestroy(): void {
    this.subcription?.unsubscribe();
  }

  private subcription: Subscription | undefined = undefined;
  protected user = JSON.parse(localStorage.getItem('user')!);
  protected jobList = signal<Job[] | undefined>(undefined);
  protected isLoading = signal(false);

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

  protected jobCategory = computed(() => {
    const jobs = this.jobList();
    if (!jobs) return null;
    return {
      wishlist: jobs.filter((job) => job.status === Status.wishlist),
      applied: jobs.filter((job) => job.status === Status.applied),
      interview: jobs.filter((job) => job.status === Status.interview),
      offer: jobs.filter((job) => job.status === Status.offer),
    };
  });

  onSearch(jobs: Job[]) {
    this.jobList.set(jobs);
  }

  deleteJobFromList(id: number) {
    const currentList = this.jobList();
    if (!currentList) return;
    this.jobList.set(currentList.filter((job) => job.id !== id));
  }

  drop(event: CdkDragDrop<any[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      // reorder inside same list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      // move between lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const movedJob = event.container.data[event.currentIndex];

      // 🔥 update status
      movedJob.status = newStatus;

      // this.updateJobStatus(movedJob);
    }
  }
}
