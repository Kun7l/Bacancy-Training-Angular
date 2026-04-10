import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Resume } from '../../features/add-job/types/resume.type';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  constructor(private http: HttpClient) {}
  private url = `${environment.supabaseUrl}/storage/v1/object`;
  private addResumeUrl = `${environment.supabaseUrl}/rest/v1/resumes`;
  private bucketName = 'Resume';

  uploadResume(file: File, fileName?: string) {
    const filePath = `${this.bucketName}/${fileName ? fileName : file.name}`;

    return this.http
      .post<{ Key: string }>(`${this.url}/${filePath}`, file)
      .pipe(
        map(
          (response) =>
            `${environment.supabaseUrl}/storage/v1/object/public/${response.Key}`,
        )
      );
  }

  addResume(url: string,name: string) {
    return this.http.post(this.addResumeUrl, { name, url });
  }
  getAllResume() : Observable<Resume[]> {
    return this.http.get<Resume[]>(this.addResumeUrl);
  }
}
