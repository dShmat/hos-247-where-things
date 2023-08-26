import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {ContainerInterface} from '../models/container-interface';
import {PutItemInterface} from '../models/put-item-interface';
import {ThingInterface} from '../models/thing-interface';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  private readonly containersUrl: string = 'http://localhost:3004/containers'

  constructor(private http: HttpClient) {
  }

  getContainers(): Observable<ContainerInterface[]> {
    return this.http.get<ContainerInterface[]>(this.containersUrl);
  }

  getContainerById(id: number): Observable<ContainerInterface> {
    return this.http.get<ContainerInterface>(`${this.containersUrl}/${id}`);
  }

  createContainer(container: ContainerInterface): Observable<ContainerInterface> {
    return this.http.post<ContainerInterface>(this.containersUrl, container);
  }

  updateContainer(container: ContainerInterface): Observable<ContainerInterface> {
    return this.http.put<ContainerInterface>(`${this.containersUrl}/${container.id}`, container);
  }

  deleteContainer(id: number): Observable<ContainerInterface> {
    return this.http.delete<ContainerInterface>(`${this.containersUrl}/${id}`);
  }

  putItemToContainer(items: PutItemInterface, container: ContainerInterface): Observable<ContainerInterface> {
    return this.http.put<ContainerInterface>(`${this.containersUrl}/${items.parentId}`, container);
  }

  putContainerToContainer(items: PutItemInterface): Observable<ContainerInterface> {
    return this.http.patch<ContainerInterface>(`${this.containersUrl}/${items.childId}`, {nestedTo: items.parentId});
  }

  removeContainerFromContainer(thing: ThingInterface): Observable<ContainerInterface> {
    return this.http.patch<ContainerInterface>(`${this.containersUrl}/${thing.id}`, {nestedTo: thing.nestedTo});
  }
}
