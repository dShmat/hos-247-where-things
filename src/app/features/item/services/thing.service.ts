import {Injectable} from '@angular/core';
import {ThingInterface} from '../models/thing-interface';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PutItemInterface} from '../models/put-item-interface';

@Injectable({
  providedIn: 'root'
})
export class ThingService {

  private readonly thingsUrl: string = 'http://localhost:3004/things'

  constructor(private http: HttpClient) {

  }

  getThings(): Observable<ThingInterface[]> {
    return this.http.get<ThingInterface[]>(this.thingsUrl);
  }

  getThingById(id: string): Observable<ThingInterface> {
    return this.http.get<ThingInterface>(`${this.thingsUrl}/${id}`);
  }

  createThing(thing: ThingInterface): Observable<ThingInterface> {
    return this.http.post<ThingInterface>(this.thingsUrl, thing);
  }

  updateThing(thing: ThingInterface): Observable<ThingInterface> {
    return this.http.put<ThingInterface>(`${this.thingsUrl}/${thing.id}`, thing);
  }

  deleteThing(id: number): Observable<ThingInterface> {
    return this.http.delete<ThingInterface>(`${this.thingsUrl}/${id}`);
  }

  putThingToContainer(items: PutItemInterface): Observable<ThingInterface> {
    return this.http.patch<ThingInterface>(`${this.thingsUrl}/${items.childId}`, {nestedTo: items.parentId});
  }

  removeThingFromContainer(thing: ThingInterface): Observable<ThingInterface> {
    return this.http.patch<ThingInterface>(`${this.thingsUrl}/${thing.id}`, {nestedTo: thing.nestedTo});
  }
}
