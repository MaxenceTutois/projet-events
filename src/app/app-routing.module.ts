import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import {CalendarComponent} from "./_components/calendar/calendar.component";
import {EventAddComponent} from "./_components/event-add/event-add.component";

const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: CalendarComponent },
  { path: 'events/add', component: EventAddComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
