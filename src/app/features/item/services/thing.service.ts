import {Injectable} from '@angular/core';
import {ThingInterface} from '../models/thing-interface';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PutItemInterface} from "../models/put-item-interface";

@Injectable({
  providedIn: 'root'
})
export class ThingService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'my-auth-token'
    })
  };
  private readonly thingsUrl: string = 'http://localhost:3004/things'

  constructor(private http: HttpClient) {
  }

  getThings(): Observable<ThingInterface[]> {
    return this.http.get<ThingInterface[]>(this.thingsUrl, this.httpOptions);
  }

  getThingById(id: string): Observable<ThingInterface> {
    return this.http.get<ThingInterface>(`${this.thingsUrl}/${id}`, this.httpOptions);
  }

  createThing(thing: ThingInterface): Observable<ThingInterface> {
    return this.http.post<ThingInterface>(this.thingsUrl, thing, this.httpOptions);
  }

  updateThing(thing: ThingInterface): Observable<ThingInterface> {
    return this.http.put<ThingInterface>(`${this.thingsUrl}/${thing.id}`, thing, this.httpOptions);
  }

  deleteThing(id: string): Observable<ThingInterface> {
    return this.http.delete<ThingInterface>(`${this.thingsUrl}/${id}`, this.httpOptions);
  }

  putThingToContainer(items: PutItemInterface): Observable<ThingInterface> {
    return this.http.patch<ThingInterface>(`${this.thingsUrl}/${items.childId}`, {nestedTo: items.parentId}, this.httpOptions);
  }

  removeThingFromContainer(thing: ThingInterface) {
    return this.http.patch<ThingInterface>(`${this.thingsUrl}/${thing.id}`, {nestedTo: thing.nestedTo}, this.httpOptions);
  }
}
