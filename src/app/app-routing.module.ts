import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapBoxComponent } from './map-box/map-box.component';
import { FarmComponent } from './farm/farm.component';
import { FarmDetailComponent } from './farm-detail/farm-detail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeroComponent } from './hero/hero.component';
import { BigmapComponent } from './bigmap/bigmap.component';
import { AboutComponent } from './about/about.component';
import { MarketComponent } from './market/market.component';
import { MainmapComponent } from './mainmap/mainmap.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'bm-hofsos', component: MapBoxComponent },
  { path: 'farm/:id', component: FarmDetailComponent },
  { path: 'farm', component: FarmComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HeroComponent },
  { path: 'matarlandslag', component: BigmapComponent },
  { path: 'about', component: AboutComponent },
  { path: 'market', component: MarketComponent },
  { path: 'mainmap', component: MainmapComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
