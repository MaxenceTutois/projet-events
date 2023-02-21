import { Component, OnInit } from '@angular/core';

import { EventsService } from "../../_services/events.service";
import { Event } from "../../_models/event";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  events: Event[] = [];

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventsService.getEvents()
      .subscribe(events => this.events = events);
  }
}
