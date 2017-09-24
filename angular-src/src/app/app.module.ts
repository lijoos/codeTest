import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule,Routes}  from '@angular/router'
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';

import { HomeComponent } from './home/home.component';

import {FlashMessagesModule} from 'angular2-flash-messages'
import { BetComponent } from './bet/bet.component';
import { BetService } from "app/service/BetService";
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule ,
   // routing ,
    FlashMessagesModule
  ],
  providers: [BetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
