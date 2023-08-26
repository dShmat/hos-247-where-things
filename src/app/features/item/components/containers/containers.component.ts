import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {BehaviorSubject, filter} from "rxjs";
import {DataService} from "../../services/data.service";
import {ContainerInterface} from "../../models/container-interface";
import {CreateEditContainerModalComponent} from "../create-edit-container-modal/create-edit-container-modal.component";
import {ThingInterface} from "../../models/thing-interface";
import {PutActionModalComponent} from "../put-action-modal/put-action-modal.component";
import {PutItemInterface} from "../../models/put-item-interface";

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent implements OnInit {
  bsModalRef?: BsModalRef;
  containers$: BehaviorSubject<ContainerInterface[]> = this.dataService.containers$;

  constructor(
    private modalService: BsModalService,
    private dataService: DataService,
  ) {
  }

  ngOnInit() {
    this.dataService.getContainers();
  }

  openDialog(editableContainer?: ContainerInterface): void {
    const initialState = {
      header: editableContainer ? 'Edit Container' : 'Create Container',
      inputContainer: editableContainer
    };
    this.bsModalRef = this.modalService.show(CreateEditContainerModalComponent, {initialState});
    this.bsModalRef.content.event.pipe(
      filter(container => !!container))
      .subscribe(
        (container: ContainerInterface) => {
          if (!editableContainer) {
            this.dataService.createContainer(container)
          } else {
            this.dataService.updateContainer(container)
          }
        }
      )
  }

  updateContainer(containerId: number): void {
    const editableContainer: ContainerInterface | undefined = this.containers$.value
      .find(container => container.id === containerId);
    if (editableContainer) {
      this.openDialog(editableContainer)
    }
  }

  putToContainer(id: number): void {
    const editableThing: ContainerInterface | undefined = this.containers$.value
      .find(container => container.id === id);
    if (editableThing) {
      this.openPutActionDialog(editableThing);
    }
  }

  removeFromContainer(id: number): void {
    const editableContainer: ContainerInterface | undefined = this.containers$.value.find(thing => thing.id === id);
    if (editableContainer) {
      this.dataService.removeFromContainer(editableContainer, true);
    }
  }

  openPutActionDialog(container: ContainerInterface): void {
    const initialState = {
      header: 'Put Container to Container',
      item: container,
      isContainer: true
    };
    this.bsModalRef = this.modalService.show(PutActionModalComponent, {initialState});
    this.bsModalRef.content.event.pipe(
      filter(container => !!container))
      .subscribe(
        (container: PutItemInterface) => {
          this.dataService.prepareDataToPutItem(container, true)
        }
      )
  }

  deleteContainer(containerId: number): void {
    this.dataService.deleteContainer(containerId);
  }
}
