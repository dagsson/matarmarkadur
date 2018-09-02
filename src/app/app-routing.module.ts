import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapBoxComponent } from './map-box/map-box.component';
import { FarmComponent } from './farm/farm.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MapBoxComponent },
  { path: 'farm', component: FarmComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
