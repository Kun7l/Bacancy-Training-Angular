import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';
import { EventItem } from '../types/event.type';
import { CreateEventRequest } from '../types/create.event.type';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly baseUrl = 'http://localhost:5059/api';

  getAllEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(`${this.baseUrl}/Event/viewall`);
  }

  createEvent(payload: CreateEventRequest): Observable<EventItem> {
    return this.http.post<EventItem>(`${this.baseUrl}/Event/create`, payload);
  }
}

