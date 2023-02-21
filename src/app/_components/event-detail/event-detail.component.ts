import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventsService} from "../../_services/events.service";
import {Location} from "@angular/common";
import {Event} from "../../_models/event";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent {

  types = ['Routine', 'Repas', 'Travail', 'Loisir'];

  @Input() event?: Event;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getEvent();
  }

  getEvent(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  }
}
