import { Injectable } from '@angular/core';
import { Subject, Observable, filter, map } from 'rxjs';

export enum EventType {
  UPDATEUSER = 'updateUser',
  ADDTOCART = 'addToCart',
}
interface UpdateUserEvent {
  event: EventType.ADDTOCART;
  data: { productId: string; userName: string };
}

interface AddToCartEvent {
  event: EventType.UPDATEUSER;
  data: { userId: string; quantity: number };
}

export type EventServiceType = UpdateUserEvent | AddToCartEvent;

@Injectable({
  providedIn: 'root',
})
export class EventService<EventServiceType> {
  private subject: Subject<{ event: EventType; data: any }> = new Subject<{
    event: EventType;
    data: any;
  }>();

  on(event: EventType): Observable<EventServiceType> {
    return this.subject.asObservable().pipe(
      filter((eventData) => eventData.event === event),
      map((eventData) => eventData.data as EventServiceType)
    );
  }

  emit(event: EventType, data: EventServiceType) {
    this.subject.next({ event, data });
  }
}
