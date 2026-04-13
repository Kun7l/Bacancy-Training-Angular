import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateJobDto } from '../models/create.job.dto';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.supabaseUrl}/rest/v1/jobs`;

  addJob(jobData: CreateJobDto) {
    return this.http.post(this.baseUrl, jobData);
  }
  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(
      `${this.baseUrl}?select=*,resume:resume_id(name,url)`,
    );
  }
  getJobById(id: number): Observable<Job | null> {
    return this.http
      .get<Job[]>(
        `${this.baseUrl}?id=eq.${id}&select=*,resume:resume_id(name,url)&limit=1`,
      )
      .pipe(map((jobs) => jobs[0] ?? null));
  }
  deleteJob(id: number) {
    return this.http.delete(`${this.baseUrl}?id=eq.${id}`);
  }
  updateJob(id: number, jobData: CreateJobDto) {
    return this.http.patch(`${this.baseUrl}?id=eq.${id}`, jobData);
  }
  searchJob(query: string): Observable<Job[]> {
    return this.http.get<Job[]>(
      `${this.baseUrl}?or=(company.ilike.*${query}*,role.ilike.*${query}*,status.ilike.*${query}*)`,
    );
  }
}
