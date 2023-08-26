import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContainerInterface} from "../../models/container-interface";
import {DataService} from "../../services/data.service";

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
  parentName: string = '-';

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    if (this.container) {
      this.isNested = !!this.container.nestedTo;
      if (this.isNested) {
        this.dataService.containers$
          .subscribe(
            containers => {
              this.parentName = containers.find(container =>
                container.id === this.container?.nestedTo)?.name || 'Not found';
            }
          )
      }
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
