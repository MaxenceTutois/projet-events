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
  filterTypes: string[] = [];
  chosenType: string = 'All';

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventsService.getEvents()
      .subscribe(events => {this.events = events; this.populateTypeFilter();});
  }

  populateTypeFilter(): void {
    if (this.events) {
      let types = [];
      types.push('All');
      for (let i = 0; i < this.events.length; i++) {
        types.push(this.events[i].type);
      }
      this.filterTypes = Array.from(new Set(types));
    }
  }

  filter() {
    if (this.chosenType) {
      if (this.chosenType == 'All') {
        this.getEvents();
      }
      else {
        this.eventsService.getEventsWithFilters(this.chosenType, '')
          .subscribe(events => this.events = events);
      }
    }
  }

  delete(id: number) {
    this.events = this.events.filter(e => e.id != id);
    this.eventsService.deleteEvent(id).subscribe();
  }
}
