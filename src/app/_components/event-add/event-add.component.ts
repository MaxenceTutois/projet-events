import {Component, OnInit} from '@angular/core';
import {Event} from "../../_models/event";
import {ActivatedRoute} from "@angular/router";
import {EventsService} from "../../_services/events.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {

  types = ['Routine', 'Repas', 'Travail', 'Loisir'];
  model = new Event(0, 'Event title', '00:00', this.types[0])
  isUpdate = false;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isUpdate = true;
      this.eventsService.getEvent(id)
        .subscribe(event => this.model = event);
    }
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    if (this.model) {
      if (this.isUpdate) {
        this.eventsService.updateEvent(this.model)
          .subscribe(() => this.goBack());
      }
      else {
        this.eventsService.addEvent(this.model)
          .subscribe(() => this.goBack());
      }
    }
  }

}
