import { Injectable } from '@angular/core';
import { Subject, Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private subject = new Subject<{ event: string; data: any }>();

  on<T>(event: string): Observable<T> {
    return this.subject.asObservable().pipe(
      filter((eventData) => eventData.event === event),
      map((eventData) => eventData.data as T)
    );
  }

  emit<T>(event: string, data: T) {
    this.subject.next({ event, data });
  }
}
