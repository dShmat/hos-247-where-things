import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ThingInterface} from '../../models/thing-interface';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-thing-view',
  templateUrl: './thing-view.component.html',
  styleUrls: ['./thing-view.component.scss']
})
export class ThingViewComponent implements OnInit {
  @Input() thing?: ThingInterface;
  @Output() updateEmitted: EventEmitter<number> = new EventEmitter<number>();
  @Output() putEmitted: EventEmitter<number> = new EventEmitter<number>();
  @Output() removeEmitted: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteEmitted: EventEmitter<number> = new EventEmitter<number>();

  isNested: boolean = false;
  parentName: string = '-';

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    if (this.thing) {
      this.isNested = !!this.thing.nestedTo;
      if (this.isNested) {
        this.dataService.containers$
          .subscribe(
            containers => {
              this.parentName = containers.find(container =>
                container.id === this.thing?.nestedTo)?.name || 'Not found';
            }
          )
      }
    }
  }

  updateThing(): void {
    this.updateEmitted.emit(this.thing?.id);
  }

  putTo(): void {
    this.putEmitted.emit(this.thing?.id);
  }

  removeFromContainer(): void {
    this.removeEmitted.emit(this.thing?.id)
  }

  deleteThing(): void {
    this.deleteEmitted.emit(this.thing?.id);
  }
}
