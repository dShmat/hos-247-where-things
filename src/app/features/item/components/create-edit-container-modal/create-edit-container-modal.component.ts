import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ContainerInterface} from '../../models/container-interface';
import {DataService} from '../../services/data.service';

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
    volume: [0, [Validators.required, Validators.min(1), Validators.max(1000)]],
  })

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
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

  get volume() {
    return this.containerForm.get('volume');
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
    if (!this.inputContainer?.nestedItems && !this.inputContainer?.nestedContainers) {
      emptyVolume = +(this.containerForm?.get('volume')?.value as number)
    } else if (this.inputContainer?.id) {
      emptyVolume = (this.volume?.value || 0) - this.dataService.getContainerBusyPlace(this.inputContainer?.id);
    }
    if (emptyVolume && emptyVolume < 0) {
      this.volume?.setErrors({'incorrect': true});
      return;
    }
    const result = {
      id: this.inputContainer?.id,
      nestedTo: this.inputContainer?.nestedTo || null,
      nestedItems: this.inputContainer?.nestedItems || [],
      nestedContainers: this.inputContainer?.nestedContainers || [],
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
