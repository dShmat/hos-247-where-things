import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApartmentPageComponent} from "./pages/apartment-page/apartment-page.component";

const routes: Routes = [
  {
    path: '',
    component: ApartmentPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {
}
