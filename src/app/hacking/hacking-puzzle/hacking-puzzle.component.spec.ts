import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HackingPuzzleComponent } from './hacking-puzzle.component';

describe('HackingPuzzleComponent', () => {
  let component: HackingPuzzleComponent;
  let fixture: ComponentFixture<HackingPuzzleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HackingPuzzleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackingPuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
