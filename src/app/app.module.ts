import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';

import { AuthService } from './auth.service';

import { AppComponent } from './app.component';
import { MapBoxComponent } from './map-box/map-box.component';
import { AppRoutingModule } from './/app-routing.module';
import { FarmComponent } from './farm/farm.component';
import { FarmDetailComponent } from './farm-detail/farm-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { HeroComponent } from './hero/hero.component';
import { BigmapComponent } from './bigmap/bigmap.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MapBoxComponent,
    FarmComponent,
    FarmDetailComponent,
    NavbarComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    HeroComponent,
    BigmapComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { 
  
}


