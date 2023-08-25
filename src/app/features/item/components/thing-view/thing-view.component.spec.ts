import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingViewComponent } from './thing-view.component';

describe('ThingViewComponent', () => {
  let component: ThingViewComponent;
  let fixture: ComponentFixture<ThingViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThingViewComponent]
    });
    fixture = TestBed.createComponent(ThingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
