import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CalendarComponent } from './_components/calendar/calendar.component';
import { EventDetailComponent } from './_components/event-detail/event-detail.component';
import { EventAddComponent } from './_components/event-add/event-add.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    EventDetailComponent,
    EventAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
