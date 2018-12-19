import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { AboutComponent } from './about/about.component';
import { HttpClientModule} from '@angular/common/http';
import { MarketComponent } from './market/market.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import { IssueService } from './issue.service';
import { MainmapComponent } from './mainmap/mainmap.component';
import { CreateFarmComponent } from './create-farm/create-farm.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EditFarmComponent } from './edit-farm/edit-farm.component';
import { FilterPipe } from 'src/app/farmfilter.pipe';
import { MapComponent } from './map/map.component';

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
    FooterComponent,
    MarketComponent,
    AboutComponent,
    MainmapComponent,
    CreateFarmComponent,
    WelcomeComponent,
    EditFarmComponent,
    FilterPipe,
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    NgbModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatCheckboxModule,
    AngularFontAwesomeModule
  ],
  providers: [AuthService, IssueService],
  bootstrap: [AppComponent]
})

export class AppModule { 
  
}


