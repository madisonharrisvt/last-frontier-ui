import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Event } from '../../models/event.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event: Event;
  eventForm: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.eventForm = new FormGroup({
      title: new FormControl('', {
        validators: [Validators.required]
      }),
      location: new FormControl(),
      startDate: new FormControl('', {
        validators: [Validators.required]
      }),
      endDate: new FormControl('', {
        validators: [Validators.required]
      }),
      description: new FormControl(),
      details: new FormControl()
    });

    this.getAndSetEvent();
  }

  getAndSetEvent() {
    var eventIdFromRoute = this.route.snapshot.paramMap.get('id');

    //if(eventIdFromRoute == 'new')
  }

  save() {
    if(this.event == null) {
      this.event = new Event();
      this.event.id = 0;
    }

    this.event.title = this.eventForm.value.title;
    this.event.location = this.eventForm.value.location;
    this.event.startDate = this.eventForm.value.startDate;
    this.event.endDate = this.eventForm.value.endDate;
    this.event.description = this.eventForm.value.description;
    this.event.details = this.eventForm.value.details;

    this.eventService.updateEvent(this.event)
    .subscribe(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }

}
