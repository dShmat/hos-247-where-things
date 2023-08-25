import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";
import {ContainerInterface} from "../../models/container-interface";

@Component({
  selector: 'app-create-edit-container-modal',
  templateUrl: './create-edit-container-modal.component.html',
  styleUrls: ['./create-edit-container-modal.component.scss']
})
export class CreateEditContainerModalComponent implements OnInit {
  public event: EventEmitter<ContainerInterface> = new EventEmitter();
  header: string = 'Not set';
  inputContainer?: ContainerInterface;
  containerForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    volume: [0, Validators.required],
  })

  constructor(
    private formBuilder: FormBuilder,
    public modalRef: BsModalRef
  ) {
  }

  get nameInvalid() {
    return this.containerForm.get('name')?.errors &&
      (this.containerForm.get('name')?.dirty ||
        this.containerForm.get('name')?.touched)
  }

  get descriptionInvalid() {
    return this.containerForm.get('description')?.errors &&
      (this.containerForm.get('description')?.dirty ||
        this.containerForm.get('description')?.touched)
  }

  get volumeInvalid() {
    return this.containerForm.get('volume')?.errors &&
      (this.containerForm.get('volume')?.dirty ||
        this.containerForm.get('volume')?.touched)
  }

  ngOnInit() {
    if (this.inputContainer) {
      this.containerForm.patchValue(this.inputContainer);
    }
  }

  saveContainer() {
    if (!this.containerForm.valid) {
      this.containerForm.markAllAsTouched();
      return;
    }
    let emptyVolume = this.inputContainer?.emptyVolume
    if (!this.inputContainer?.nestedElements) {
      emptyVolume = +(this.containerForm?.get('volume')?.value as number)
    }
    const result = {
      id: this.inputContainer?.id,
      nestedTo: this.inputContainer?.nestedTo || null,
      nestedElements: this.inputContainer?.nestedElements || [],
      emptyVolume: emptyVolume,
      ...this.containerForm?.value
    }
    this.triggerEvent(result as ContainerInterface);
    this.modalRef.hide();

  }

  triggerEvent(item: ContainerInterface) {
    this.event.emit(item);
  }
}
