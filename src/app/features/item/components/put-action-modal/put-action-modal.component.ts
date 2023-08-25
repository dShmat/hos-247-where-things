import {Component, EventEmitter, OnInit} from '@angular/core';
import {PutItemInterface} from "../../models/put-item-interface";
import {ContainerInterface} from "../../models/container-interface";
import {ThingInterface} from "../../models/thing-interface";
import {BsModalRef} from "ngx-bootstrap/modal";
import {BehaviorSubject} from "rxjs";
import {DataService} from "../../services/data.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-put-action-modal',
  templateUrl: './put-action-modal.component.html',
  styleUrls: ['./put-action-modal.component.scss']
})
export class PutActionModalComponent implements OnInit {
  public event: EventEmitter<PutItemInterface> = new EventEmitter();
  header: string = 'Not set';
  availableContainers: ContainerInterface[] = [];
  item?: ThingInterface | ContainerInterface;
  containers$: BehaviorSubject<ContainerInterface[]> = this.dataService.containers$;

  putItemForm = this.fb.group({
    parentId: ['', Validators.required]
  })

  get containerInvalid() {
    return this.putItemForm.get('parentId')?.errors &&
      (this.putItemForm.get('parentId')?.dirty ||
        this.putItemForm.get('parentId')?.touched)
  }

  constructor(
    public modalRef: BsModalRef,
    public fb: FormBuilder,
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    if (this.item) {
      const volume = this.item.volume;
      this.availableContainers = this.containers$.value.filter((container: ContainerInterface) =>
        container.emptyVolume >= volume
      )
    }
  }

  save(){
    if (!this.putItemForm.valid) {
      this.putItemForm.markAllAsTouched();
      return;
    }
    const result: unknown = {
      childId: this.item?.id,
      parentId: +(this.putItemForm.get('parentId')?.value as string)
    }
    this.triggerEvent(result as unknown as PutItemInterface);
    this.modalRef.hide();
  }

  triggerEvent(item: PutItemInterface) {
    this.event.emit(item);
  }
}
