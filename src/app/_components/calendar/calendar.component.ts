import {Component, OnInit} from '@angular/core';

import {EventsService} from "../../_services/events.service";
import {Event} from "../../_models/event";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  events: Event[] = [];
  filteredEvents: Event[] = [];
  filterTypes: string[] = [];
  chosenType: string = 'All';
  startTime: string = '00:00';
  endTime: string = '23:59';

  constructor(private eventsService: EventsService) {
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventsService.getEvents()
      .subscribe(events => {
        this.events = events;
        this.populateTypeFilter();
        this.filteredEvents = events;
      });
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
    if (this.chosenType != 'All') {
      this.filteredEvents = this.events.filter(e => e.type == this.chosenType && e.time >= this.startTime && e.time <= this.endTime);
    }
    else {
      this.filteredEvents = this.events.filter(e => e.time >= this.startTime && e.time <= this.endTime);
    }
  }

  delete(id: number) {
    this.events = this.events.filter(e => e.id != id);
    this.filter();
    this.eventsService.deleteEvent(id).subscribe();
  }
}
