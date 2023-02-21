import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";

import {Event} from "../_models/event";

const EVENTS_API = 'http://localhost:3000/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(EVENTS_API + '?_sort=time,type&_order=asc,asc')
      .pipe(
        tap(_ => console.log('fetched events')),
        catchError(this.handleError<Event[]>('getEvents', []))
      );
  }

  getEventsWithFilters(type: string, time: string): Observable<Event[]> {
    let url = EVENTS_API + '?';
    if (type) {
      url = url + 'type=' + type;
    }
    if (time) {
      url = url + 'time=' + time;
    }
    url = url + '&_sort=time,type&_order=asc,asc';
    return this.http.get<Event[]>(url)
      .pipe(
        tap(_ => console.log(`fetched events with filters`)),
        catchError(this.handleError<Event[]>(`getEventsWithFilters`, []))
      );
  }

  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(EVENTS_API, event, this.httpOptions).pipe(
      tap((newEvent: Event) => console.log(`added event with id=${newEvent.id}`)),
      catchError(this.handleError<Event>(`addEvent`))
    );
  }
}
