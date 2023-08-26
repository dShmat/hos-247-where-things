import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ItemModule} from './features/item/item.module';
import {CoreModule} from './core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpHeadersInterceptor} from './core/interceptor/http-headers.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ItemModule,
    BrowserAnimationsModule,

    ModalModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: HttpHeadersInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
