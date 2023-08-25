import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutActionModalComponent } from './put-action-modal.component';

describe('PutActionModalComponent', () => {
  let component: PutActionModalComponent;
  let fixture: ComponentFixture<PutActionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PutActionModalComponent]
    });
    fixture = TestBed.createComponent(PutActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
