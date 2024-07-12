import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export enum EventType {
  UPDATEUSER = 'updateUser',
  ADDTOCART = 'addToCart',
  REMOVECART = 'removeCart',
}

interface UpdateUserEvent {
  event: EventType.UPDATEUSER;
  data: { userId: string; userName: string };
}

interface AddToCartEvent {
  event: EventType.ADDTOCART;
  data: { productId: string; quantity: number; userId: number };
}

interface RemoveCartEvent {
  event: EventType.REMOVECART;
  data: { productId: string; quantity: number; name: string };
}

type EventMap = {
  [EventType.UPDATEUSER]: UpdateUserEvent;
  [EventType.ADDTOCART]: AddToCartEvent;
  [EventType.REMOVECART]: RemoveCartEvent;
};

export type EventServiceType =
  | UpdateUserEvent
  | AddToCartEvent
  | RemoveCartEvent;

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private subject = new Subject<EventServiceType>();

  on<K extends keyof EventMap>(event: K): Observable<EventMap[K]['data']> {
    return this.subject.asObservable().pipe(
      filter((e): e is EventMap[K] => e.event === event),
      map((e) => e.data)
    );
  }

  emit<K extends keyof EventMap>(event: K, data: EventMap[K]['data']): void {
    this.subject.next({ event, data } as EventMap[K]);
  }
}
