import {Injectable} from '@angular/core';
import {ThingService} from './thing.service';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {ThingInterface} from '../models/thing-interface';
import {ContainerInterface} from "../models/container-interface";
import {ContainerService} from "./container.service";
import {PutItemInterface} from "../models/put-item-interface";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  things$ = new BehaviorSubject<ThingInterface[]>([]);
  containers$ = new BehaviorSubject<ContainerInterface[]>([]);

  constructor(
    private thingService: ThingService,
    private containerService: ContainerService
  ) {
    this.getThings();
    this.getContainers();
  }

  getThings(): void {
    this.thingService.getThings().subscribe({
        next: (things: ThingInterface[]) => {
          this.things$.next(things);
        },
        error: err => {
          console.log('err', err)
        }
      }
    )
  }

  createThing(thing: ThingInterface): void {
    this.thingService.createThing(thing).subscribe({
        next: (thing: ThingInterface) => {
          this.things$.next([thing, ...this.things$.value]);
        },
        error: err => {
          console.log('err', err)
        }
      }
    )
  }

  updateThing(thing: ThingInterface): void {
    this.thingService.updateThing(thing).subscribe({
      next: (updatedThing: ThingInterface) => {
        this.things$.next(this.things$.value.map((item) => (item.id === thing.id ? {...updatedThing} : item)));
      }
    })
  }

  deleteThing(id: number): void {
    this.thingService.deleteThing(id).subscribe({
      next: () => {
        this.things$.next(this.things$.value.filter((obj) => obj.id !== id));
      }
    })
  }


  prepareDataToPutItem(items: PutItemInterface, isContainer: boolean = false) {
    const parentContainer =
      this.containers$.value.find(container => container.id === items.parentId)
    const child = isContainer ?
      this.containers$.value.find(thing => thing.id === items.childId) :
      this.things$.value.find(thing => thing.id === items.childId);
    if (parentContainer && child) {
      parentContainer.emptyVolume = parentContainer.emptyVolume - child.volume;
      const nestedItems: number[] = isContainer ?
        parentContainer.nestedContainers || [] :
        parentContainer.nestedItems || [];
      nestedItems.unshift(items.childId);
      if (isContainer) {
        parentContainer.nestedContainers = nestedItems;
      } else {
        parentContainer.nestedItems = nestedItems;
      }
      this.putThingToContainer(items, parentContainer, isContainer);
    }
  }

  putThingToContainer(items: PutItemInterface, parentContainer: ContainerInterface, isContainer: boolean = false): void {
    const updateChild = isContainer ?
      this.containerService.putContainerToContainer(items) :
      this.thingService.putThingToContainer(items);
    const updateParent: Observable<ContainerInterface> = this.containerService.putItemToContainer(items, parentContainer);
    combineLatest([updateChild, updateParent])
      .subscribe(([updateChild, updateParent]) => {
        if (isContainer) {
          this.containers$.next(this.containers$.value
            .map((container) => (container.id === items.childId ? {...updateChild as ContainerInterface} : container)));
        } else {
          this.things$.next(this.things$.value
            .map((item) => (item.id === items.childId ? {...updateChild} : item)));
        }
        this.containers$.next(this.containers$.value
          .map((container) => (container.id === items.parentId ? {...updateParent} : container)));
      });
  }

  removeFromContainer(item: ThingInterface, isContainer: boolean = false) {
    const parentContainer =
      this.containers$.value.find(container => container.id === item.nestedTo);
    if (parentContainer && item.id != null) {
      if (isContainer) {
        parentContainer.nestedContainers.splice(parentContainer?.nestedContainers.indexOf(item.id), 1);
      } else {
        parentContainer.nestedItems.splice(parentContainer?.nestedItems.indexOf(item.id), 1);
      }
      parentContainer.emptyVolume = parentContainer.emptyVolume + item.volume;
      item.nestedTo = null;
      const updateChild = isContainer ?
        this.containerService.removeContainerFromContainer(item) :
        this.thingService.removeThingFromContainer(item);
      const updateParent: Observable<ContainerInterface> = this.containerService.updateContainer(parentContainer);
      combineLatest([updateChild, updateParent])
        .subscribe(([updateChild, updateParent]) => {
            if (isContainer) {
              this.containers$.next(this.containers$.value
                .map((container) => (container.id === item.id ? {...updateChild as ContainerInterface} : container)));
            } else {
              this.things$.next(this.things$.value
                .map((thing) => (thing.id === item.id ? {...updateChild} : thing)));
            }
            this.containers$.next(this.containers$.value
              .map((container) => (container.id === parentContainer.id ? {...updateParent} : container)));
          }
        )
    }
  }

  getContainers(): void {
    this.containerService.getContainers().subscribe({
        next: (containers: ContainerInterface[]) => {
          this.containers$.next(containers);
        },
        error: err => {
          console.log('err', err)
        }
      }
    )
  }

  createContainer(container: ContainerInterface): void {
    this.containerService.createContainer(container).subscribe({
        next: (container: ContainerInterface) => {
          this.containers$.next([container, ...this.containers$.value]);
        },
        error: err => {
          console.log('err', err)
        }
      }
    )
  }

  updateContainer(container: ContainerInterface): void {
    this.containerService.updateContainer(container).subscribe({
      next: (updatedContainer: ContainerInterface) => {
        this.containers$.next(this.containers$.value.map((item) => (item.id === container.id ? {...updatedContainer} : item)));
      }
    })
  }

  deleteContainer(id: number): void {
    this.containerService.deleteContainer(id).subscribe({
      next: () => {
        this.containers$.next(this.containers$.value.filter((obj) => obj.id !== id));
      }
    })
  }
}
