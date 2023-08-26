import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContainerInterface} from "../../models/container-interface";

@Component({
  selector: 'app-container-view',
  templateUrl: './container-view.component.html',
  styleUrls: ['./container-view.component.scss']
})
export class ContainerViewComponent implements OnInit {
  @Input() container?: ContainerInterface;
  @Output() updateEmitted: EventEmitter<number> = new EventEmitter<number>();
  @Output() putEmitted: EventEmitter<number> = new EventEmitter<number>();
  @Output() removeEmitted: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteEmitted: EventEmitter<number> = new EventEmitter<number>();

  isNested: boolean = false;

  ngOnInit(): void {
    if (this.container) {
      this.isNested = !!this.container.nestedTo;
    }
  }

  updateContainer(): void {
    this.updateEmitted.emit(this.container?.id);
  }

  putTo(): void {
    this.putEmitted.emit(this.container?.id);
  }

  removeFromContainer(): void {
    this.removeEmitted.emit(this.container?.id)
  }

  deleteContainer(): void {
    this.deleteEmitted.emit(this.container?.id);
  }
}
