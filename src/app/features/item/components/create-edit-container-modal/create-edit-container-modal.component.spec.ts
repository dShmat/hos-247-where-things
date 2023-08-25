import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditContainerModalComponent } from './create-edit-container-modal.component';

describe('CreateEditContainerComponent', () => {
  let component: CreateEditContainerModalComponent;
  let fixture: ComponentFixture<CreateEditContainerModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditContainerModalComponent]
    });
    fixture = TestBed.createComponent(CreateEditContainerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
