import { Component, OnInit } from '@angular/core';
import { LfeventService } from '../../services/lfevent.service';
import { LFEvent } from '../../models/event.interface';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  lfevents: LFEvent[];
  displayedColumns = ['title', 'startDate', 'endDate'];

  constructor(private lfEventService: LfeventService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.lfEventService.getEvents()
      .subscribe(lfevents => this.lfevents = lfevents);
  }
}
