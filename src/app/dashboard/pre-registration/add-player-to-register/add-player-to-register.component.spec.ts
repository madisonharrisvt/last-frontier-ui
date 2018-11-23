import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayerToRegisterComponent } from './add-player-to-register.component';

describe('AddPlayerToRegisterComponent', () => {
  let component: AddPlayerToRegisterComponent;
  let fixture: ComponentFixture<AddPlayerToRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlayerToRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayerToRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
