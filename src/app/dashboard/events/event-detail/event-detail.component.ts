import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LFEvent } from '../../models/event.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LfeventService } from '../../services/lfevent.service';
import { MatDialog, MatTableDataSource } from '../../../../../node_modules/@angular/material';
import { CharactersComponent } from '../../character/characters/characters.component';
import { AddCharacterToEventDialogComponent } from '../add-character-to-event-dialog/add-character-to-event-dialog.component';
import { CharacterEvent } from '../../models/character-event.interface';
import { CharacterEventService } from '../../services/character-event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event: LFEvent;
  attendingCharacters: MatTableDataSource<CharacterEvent>;
  displayedColumns = ['playerId', 'name', 'vpToXp', 'vpToItems', 'xpBought']
  eventForm: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private lfeventService: LfeventService,
    private characterEventService: CharacterEventService,
    private dialog: MatDialog
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
      details: new FormControl(),
      isActiveEvent: new FormControl()
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
          this.eventForm.get('isActiveEvent').setValue(event.isActiveEvent);

          this.characterEventService.getEventsCharacters(event.id)
            .subscribe(characterEvents => {
              this.attendingCharacters = new MatTableDataSource(characterEvents);
            });
        });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCharacterToEventDialogComponent, {
      width: '800px',
      data: this.event
    });
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
    this.event.isActiveEvent = this.eventForm.value.isActiveEvent;

    this.lfeventService.updateEvent(this.event)
    .subscribe(() => this.goBack());
  }

  saveVpToItems(characterEvent: CharacterEvent) {
    var pleaseWork = '';
    this.characterEventService.saveCharacterEvent(characterEvent).subscribe();
  }

  goBack() {
    this.location.back();
  }

}
