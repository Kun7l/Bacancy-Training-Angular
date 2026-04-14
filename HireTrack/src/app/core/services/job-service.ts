import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateJobDto } from '../models/create.job.dto';
import { environment } from '../../environments/environment';
import { catchError, map, Observable } from 'rxjs';
import { Job } from '../models/job.model';
import { MessageService } from './messageService';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  private baseUrl = `${environment.supabaseUrl}/rest/v1/jobs`;

  addJob(jobData: CreateJobDto) {
    return this.http.post(this.baseUrl, jobData).pipe(
      catchError((err) => {
        this.messageService.setErrorMessage(err);
        throw err;
      }),
    );
  }
  getAllJobs(): Observable<Job[]> {
    return this.http
      .get<Job[]>(`${this.baseUrl}?select=*,resume:resume_id(name,url)`)
      .pipe(
        catchError((err) => {
          this.messageService.setErrorMessage(err);
          throw err;
        }),
      );
  }
  getJobById(id: number): Observable<Job | null> {
    return this.http
      .get<
        Job[]
      >(`${this.baseUrl}?id=eq.${id}&select=*,resume:resume_id(name,url)&limit=1`)
      .pipe(
        map((jobs) => jobs[0] ?? null),
        catchError((err) => {
          this.messageService.setErrorMessage(err);
          throw err;
        }),
      );
  }
  deleteJob(id: number) {
    return this.http.delete(`${this.baseUrl}?id=eq.${id}`).pipe(
      catchError((err) => {
        this.messageService.setErrorMessage(err);
        throw err;
      }),
    );
  }
  updateJob(id: number, jobData: CreateJobDto) {
    return this.http.patch(`${this.baseUrl}?id=eq.${id}`, jobData).pipe(
      catchError((err) => {
        this.messageService.setErrorMessage(err);
        throw err;
      }),
    );
  }
  updateJobStatus(id: number, status: string) {
    return this.http
      .patch(`${this.baseUrl}?id=eq.${id}`, { status, last_edited: new Date() })
      .pipe(
        catchError((err) => {
          this.messageService.setErrorMessage(err);
          throw err;
        }),
      );
  }

  searchJob(query: string): Observable<Job[]> {
    return this.http
      .get<
        Job[]
      >(`${this.baseUrl}?or=(company.ilike.*${query}*,role.ilike.*${query}*,status.ilike.*${query}*)`)
      .pipe(
        catchError((err) => {
          this.messageService.setErrorMessage(err);
          throw err;
        }),
      );
  }
}
