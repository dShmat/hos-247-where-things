import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {BehaviorSubject, filter} from "rxjs";
import {DataService} from "../../services/data.service";
import {ContainerInterface} from "../../models/container-interface";
import {CreateEditContainerModalComponent} from "../create-edit-container-modal/create-edit-container-modal.component";

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

  updateContainer(containerId: string): void {
    const editableContainer: ContainerInterface | undefined = this.containers$.value.find(container => container.id === containerId);
    if (editableContainer) {
      this.openDialog(editableContainer)
    }
  }

  deleteContainer(containerId: string): void {
    this.dataService.deleteContainer(containerId);
  }
}
