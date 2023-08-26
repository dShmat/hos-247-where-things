import {Component} from '@angular/core';
import {CreateEditThingModalComponent} from '../create-edit-thing-modal/create-edit-thing-modal.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ThingInterface} from "../../models/thing-interface";
import {BehaviorSubject, filter} from "rxjs";
import {DataService} from "../../services/data.service";
import {PutActionModalComponent} from "../put-action-modal/put-action-modal.component";
import {PutItemInterface} from "../../models/put-item-interface";

@Component({
  selector: 'app-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.scss']
})
export class ThingsComponent {
  bsModalRef?: BsModalRef;
  things$: BehaviorSubject<ThingInterface[]> = this.dataService.things$;

  constructor(
    private modalService: BsModalService,
    private dataService: DataService,
  ) {
  }

  openEditDialog(editableThing?: ThingInterface): void {
    const initialState = {
      header: editableThing ? 'Edit Thing' : 'Create Thing',
      inputThing: editableThing
    };
    this.bsModalRef = this.modalService.show(CreateEditThingModalComponent, {initialState});
    this.bsModalRef.content.event.pipe(
      filter(thing => !!thing))
      .subscribe(
        (thing: ThingInterface) => {
          if (!editableThing) {
            this.dataService.createThing(thing)
          } else {
            this.dataService.updateThing(thing)
          }
        }
      )
  }

  updateThing(id: number): void {
    const editableThing: ThingInterface | undefined = this.things$.value.find(thing => thing.id === id);
    if (editableThing) {
      this.openEditDialog(editableThing)
    }
  }

  putToContainer(id: number): void {
    const editableThing: ThingInterface | undefined = this.things$.value.find(thing => thing.id === id);
    if (editableThing) {
      this.openPutActionDialog(editableThing);
    }
  }

  removeFromContainer(id: number): void {
    const editableThing: ThingInterface | undefined = this.things$.value.find(thing => thing.id === id);
    if (editableThing) {
      this.dataService.removeFromContainer(editableThing);
    }
  }

  openPutActionDialog(thing: ThingInterface): void {
    const initialState = {
      header: 'Put Thing to Container',
      item: thing
    };
    this.bsModalRef = this.modalService.show(PutActionModalComponent, {initialState});
    this.bsModalRef.content.event.pipe(
      filter(thing => !!thing))
      .subscribe(
        (items: PutItemInterface) => {
          this.dataService.prepareDataToPutItem(items)
        }
      )
  }

  deleteThing(thingId: number): void {
    this.dataService.deleteThing(thingId);
  }

}
