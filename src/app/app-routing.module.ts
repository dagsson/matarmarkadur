import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapBoxComponent } from './map-box/map-box.component';
import { FarmComponent } from './farm/farm.component';
import { FarmDetailComponent } from './farm-detail/farm-detail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeroComponent } from './hero/hero.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MapBoxComponent },
  { path: 'farm/:id', component: FarmDetailComponent },
  { path: 'farm', component: FarmComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'front', component: HeroComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
