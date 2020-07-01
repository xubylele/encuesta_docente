import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Encuesta6Component } from './encuesta6.component';

describe('Encuesta6Component', () => {
  let component: Encuesta6Component;
  let fixture: ComponentFixture<Encuesta6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Encuesta6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Encuesta6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
