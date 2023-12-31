import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingsComponent } from './things.component';

describe('ThingsComponent', () => {
  let component: ThingsComponent;
  let fixture: ComponentFixture<ThingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThingsComponent]
    });
    fixture = TestBed.createComponent(ThingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
