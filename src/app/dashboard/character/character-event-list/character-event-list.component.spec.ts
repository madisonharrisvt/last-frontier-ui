import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterEventListComponent } from './character-event-list.component';

describe('CharacterEventListComponent', () => {
  let component: CharacterEventListComponent;
  let fixture: ComponentFixture<CharacterEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterEventListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
