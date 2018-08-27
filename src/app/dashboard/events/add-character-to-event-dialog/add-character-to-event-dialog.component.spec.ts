import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCharacterToEventDialogComponent } from './add-character-to-event-dialog.component';

describe('AddCharacterToEventDialogComponent', () => {
  let component: AddCharacterToEventDialogComponent;
  let fixture: ComponentFixture<AddCharacterToEventDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCharacterToEventDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCharacterToEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
