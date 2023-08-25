import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditThingModalComponent } from './create-edit-thing-modal.component';

describe('CreateEditThingModalComponent', () => {
  let component: CreateEditThingModalComponent;
  let fixture: ComponentFixture<CreateEditThingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditThingModalComponent]
    });
    fixture = TestBed.createComponent(CreateEditThingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
