import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApartmentPageComponent} from './pages/apartment-page/apartment-page.component';
import {ItemRoutingModule} from './item-routing.module';
import {ThingsComponent} from './components/things/things.component';
import {ThingViewComponent} from './components/thing-view/thing-view.component';
import {CreateEditThingModalComponent} from './components/create-edit-thing-modal/create-edit-thing-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ContainersComponent} from './components/containers/containers.component';
import {ContainerViewComponent} from './components/container-view/container-view.component';
import {CreateEditContainerModalComponent} from './components/create-edit-container-modal/create-edit-container-modal.component';
import { PutActionModalComponent } from './components/put-action-modal/put-action-modal.component';


@NgModule({
  declarations: [
    ApartmentPageComponent,
    ThingsComponent,
    ThingViewComponent,
    CreateEditThingModalComponent,
    ContainersComponent,
    ContainerViewComponent,
    CreateEditContainerModalComponent,
    PutActionModalComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ItemModule {
}
