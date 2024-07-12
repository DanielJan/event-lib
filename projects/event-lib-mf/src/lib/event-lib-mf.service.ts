import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export enum EventType {
  UPDATEUSER = 'updateUser',
  ADDTOCART = 'addToCart',
  REMOVECART = 'removeCart'
}

interface UpdateUserEvent {
  event: EventType.UPDATEUSER;
  data: { userId: string; userName: string };
}

interface AddToCartEvent {
  event: EventType.ADDTOCART;
  data: { productId: string; quantity: number, userId: number };
}

interface RemoveCart {
  event: EventType.REMOVECART;
  data: { productId: string; quantity: number, name: string };
}

type EventMap = {
  [EventType.UPDATEUSER]: UpdateUserEvent;
  [EventType.ADDTOCART]: AddToCartEvent;
  [EventType.REMOVECART]: RemoveCart;
};

export type EventServiceType = UpdateUserEvent | AddToCartEvent | RemoveCart;

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private subject = new Subject<EventServiceType>();

  on<K extends keyof EventMap>(event: EventType): Observable<EventMap[K]['data']> {
    return this.subject.asObservable().pipe(
      filter((e): e is EventMap[K] => e.event === event),
      map((e) => e.data)
    );
  }

  emit<K extends keyof EventMap>(event: EventType, data: EventMap[K]['data']): void {
    this.subject.next({ event, data } as EventServiceType);
  }
}
