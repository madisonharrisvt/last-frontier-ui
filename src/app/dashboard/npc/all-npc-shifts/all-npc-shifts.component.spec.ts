import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNpcShiftsComponent } from './all-npc-shifts.component';

describe('AllNpcShiftsComponent', () => {
  let component: AllNpcShiftsComponent;
  let fixture: ComponentFixture<AllNpcShiftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllNpcShiftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllNpcShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
