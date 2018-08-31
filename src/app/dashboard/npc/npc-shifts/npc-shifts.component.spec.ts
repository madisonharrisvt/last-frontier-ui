import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcShiftsComponent } from './npc-shifts.component';

describe('NpcShiftsComponent', () => {
  let component: NpcShiftsComponent;
  let fixture: ComponentFixture<NpcShiftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpcShiftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpcShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
