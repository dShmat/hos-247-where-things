import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ContainerInterface} from "../../models/container-interface";

@Component({
  selector: 'app-container-view',
  templateUrl: './container-view.component.html',
  styleUrls: ['./container-view.component.scss']
})
export class ContainerViewComponent {
  @Input() container?: ContainerInterface;
  @Output() updateEmitted = new EventEmitter<string>();
  @Output() deleteEmitted = new EventEmitter<string>();

  updateContainer() {
    this.updateEmitted.emit(this.container?.id);
  }

  deleteContainer() {
    this.deleteEmitted.emit(this.container?.id);
  }
}
