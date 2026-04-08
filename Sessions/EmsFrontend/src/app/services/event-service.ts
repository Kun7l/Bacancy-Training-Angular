import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

export interface EventItem {
  id: number;
  name: string;
  startDate: string;
  category: string;
  ticketPrice: number;
  createdBy: number;
}

export interface CreateEventRequest {
  name: string;
  startDate: string;
  category: string;
  ticketPrice: number;
}

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
    const token = this.authService.getToken();
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;

    return this.http.post<EventItem>(`${this.baseUrl}/Event/create`, payload, { headers });
  }
}