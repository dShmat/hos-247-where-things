import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ThingInterface} from '../../models/thing-interface';

@Component({
  selector: 'app-thing-view',
  templateUrl: './thing-view.component.html',
  styleUrls: ['./thing-view.component.scss']
})
export class ThingViewComponent implements OnInit{
  @Input() thing?: ThingInterface;
  @Output() updateEmitted = new EventEmitter<string>();
  @Output() putEmitted = new EventEmitter<string>();
  @Output() removeEmitted = new EventEmitter<string>();
  @Output() deleteEmitted = new EventEmitter<string>();

  isNested: boolean = false;

  ngOnInit() {
    if (this.thing) {
      this.isNested = !!this.thing.nestedTo;
    }
  }

  updateThing() {
    this.updateEmitted.emit(this.thing?.id);
  }

  putTo() {
    this.putEmitted.emit(this.thing?.id);
  }

  removeFromContainer() {
    this.removeEmitted.emit(this.thing?.id)
  }

  deleteThing() {
    this.deleteEmitted.emit(this.thing?.id);
  }
}
