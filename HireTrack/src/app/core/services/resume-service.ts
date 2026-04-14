import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Resume } from '../../features/add-job/types/resume.type';
import { MessageService } from './messageService';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}
  private url = `${environment.supabaseUrl}/storage/v1/object`;
  private addResumeUrl = `${environment.supabaseUrl}/rest/v1/resumes`;
  private bucketName = 'Resume';

  uploadResume(file: File, fileName?: string) {
    const filePath = `${this.bucketName}/${fileName ? fileName : file.name}`;

    return this.http
      .post<{ Key: string }>(`${this.url}/${filePath}`, file)
      .pipe(
        catchError((err) => {
          if (err.status == 400) {
            this.messageService.setDangerMessage(
              'A resume with the same name already exists.',
            );
          } else {
            this.messageService.setErrorMessage(err);
          }
          console.error('Upload error:', err);
          throw err;
        }),
        map(
          (response) =>
            `${environment.supabaseUrl}/storage/v1/object/public/${response.Key}`,
        ),
      );
  }

  addResume(url: string, name: string) {
    return this.http.post(this.addResumeUrl, { name, url }).pipe(
      catchError((err) => {
        console.error('Add resume error:', err);
        this.messageService.setErrorMessage(err);
        throw err;
      }),
    );
  }

  getAllResume(): Observable<Resume[]> {
    return this.http.get<Resume[]>(this.addResumeUrl).pipe(
      catchError((err) => {
        console.error('Get all resumes error:', err);
        this.messageService.setErrorMessage(err);
        throw err;
      }),
    );
  }
}
