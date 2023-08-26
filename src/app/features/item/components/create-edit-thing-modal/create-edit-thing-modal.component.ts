import {Component, EventEmitter, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, Validators} from '@angular/forms';
import {ThingInterface} from "../../models/thing-interface";

@Component({
  selector: 'app-create-edit-thing-modal',
  templateUrl: './create-edit-thing-modal.component.html',
  styleUrls: ['./create-edit-thing-modal.component.scss']
})
export class CreateEditThingModalComponent implements OnInit {
  public event: EventEmitter<ThingInterface> = new EventEmitter();
  header: string = 'Not set';
  inputThing?: ThingInterface;
  thingForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    volume: [0, [Validators.required, Validators.min(1), Validators.max(1000)]],
  })

  constructor(
    private formBuilder: FormBuilder,
    public modalRef: BsModalRef) {
  }

  get nameInvalid() {
    return this.thingForm.get('name')?.errors &&
      (this.thingForm.get('name')?.dirty ||
        this.thingForm.get('name')?.touched)
  }

  get descriptionInvalid() {
    return this.thingForm.get('description')?.errors &&
      (this.thingForm.get('description')?.dirty ||
        this.thingForm.get('description')?.touched)
  }

  get volumeInvalid() {
    return this.thingForm.get('volume')?.errors &&
      (this.thingForm.get('volume')?.dirty ||
        this.thingForm.get('volume')?.touched)
  }

  ngOnInit() {
    if (this.inputThing) {
      this.thingForm.patchValue(this.inputThing);
    }
  }

  saveThing() {
    if (!this.thingForm.valid) {
      this.thingForm.markAllAsTouched();
      return;
    }
    const result: unknown = {
      id: this.inputThing?.id,
      nestedTo: this.inputThing?.nestedTo || null,
      ...this.thingForm?.value
    }
    this.triggerEvent(result as ThingInterface);
    this.modalRef.hide();

  }

  triggerEvent(item: ThingInterface) {
    this.event.emit(item);
  }

}
