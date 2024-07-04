import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLibMfComponent } from './event-lib-mf.component';

describe('EventLibMfComponent', () => {
  let component: EventLibMfComponent;
  let fixture: ComponentFixture<EventLibMfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventLibMfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventLibMfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
