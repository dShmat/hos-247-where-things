import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ContainerInterface} from "../models/container-interface";
import {PutItemInterface} from "../models/put-item-interface";

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'my-auth-token'
    })
  };
  private readonly containersUrl: string = 'http://localhost:3004/containers'

  constructor(private http: HttpClient) {
  }

  getContainers(): Observable<ContainerInterface[]> {
    return this.http.get<ContainerInterface[]>(this.containersUrl, this.httpOptions);
  }

  getContainerById(id: string): Observable<ContainerInterface> {
    return this.http.get<ContainerInterface>(`${this.containersUrl}/${id}`, this.httpOptions);
  }

  createContainer(container: ContainerInterface): Observable<ContainerInterface> {
    return this.http.post<ContainerInterface>(this.containersUrl, container, this.httpOptions);
  }

  updateContainer(container: ContainerInterface): Observable<ContainerInterface> {
    return this.http.put<ContainerInterface>(`${this.containersUrl}/${container.id}`, container, this.httpOptions);
  }

  deleteContainer(id: string): Observable<ContainerInterface> {
    return this.http.delete<ContainerInterface>(`${this.containersUrl}/${id}`, this.httpOptions);
  }

  putItemToContainer(items: PutItemInterface, container: ContainerInterface): Observable<ContainerInterface> {
    return this.http.put<ContainerInterface>(`${this.containersUrl}/${items.parentId}`,
      container, this.httpOptions);
  }
}
