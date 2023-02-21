import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";

import { Event } from "../_models/event";

const EVENTS_API = 'http://localhost:3000/events/';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(EVENTS_API)
      .pipe(
        tap(_ => console.log('fetched events')),
        catchError(this.handleError<Event[]>('getEvents', []))
      );
  }
}
