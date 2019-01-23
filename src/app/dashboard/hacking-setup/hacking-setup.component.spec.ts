import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HackingSetupComponent } from './hacking-setup.component';

describe('HackingSetupComponent', () => {
  let component: HackingSetupComponent;
  let fixture: ComponentFixture<HackingSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HackingSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackingSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
