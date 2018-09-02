import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapBoxComponent } from './map-box/map-box.component';
import { AppRoutingModule } from './/app-routing.module';
import { FarmComponent } from './farm/farm.component';

@NgModule({
  declarations: [
    AppComponent,
    MapBoxComponent,
    FarmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
