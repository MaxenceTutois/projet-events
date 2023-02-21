import { Component } from '@angular/core';
import {Event} from "../../_models/event";
import {ActivatedRoute} from "@angular/router";
import {EventsService} from "../../_services/events.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent {

  types = ['Routine', 'Repas', 'Travail', 'Loisir'];
  model = new Event(0, 'Event title', '00:00', this.types[0])

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    if (this.model) {
      this.eventsService.addEvent(this.model)
        .subscribe(() => this.goBack());
    }
  }
}
