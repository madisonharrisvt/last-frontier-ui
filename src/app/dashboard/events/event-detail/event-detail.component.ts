import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LFEvent } from '../../models/event.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LfeventService } from '../../services/lfevent.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event: LFEvent;
  eventForm: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private lfeventService: LfeventService
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

    if(eventIdFromRoute !== 'new' && eventIdFromRoute !== null)
    {
      this.lfeventService.getEvent(+eventIdFromRoute)
        .subscribe(event => {
          this.event = event;

          var startDate = new Date(event.startDate);
          var endDate = new Date(event.endDate);

          this.eventForm.get('title').setValue(event.title);
          this.eventForm.get('location').setValue(event.location);
          this.eventForm.get('startDate').setValue(startDate);
          this.eventForm.get('endDate').setValue(endDate);
          this.eventForm.get('description').setValue(event.description);
          this.eventForm.get('details').setValue(event.details);
        });
    }
  }

  save() {
    if(this.event == null) {
      this.event = new LFEvent();
      this.event.id = 0;
    }

    this.event.title = this.eventForm.value.title;
    this.event.location = this.eventForm.value.location;
    this.event.startDate = this.eventForm.value.startDate;
    this.event.endDate = this.eventForm.value.endDate;
    this.event.description = this.eventForm.value.description;
    this.event.details = this.eventForm.value.details;

    this.lfeventService.updateEvent(this.event)
    .subscribe(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }

}
