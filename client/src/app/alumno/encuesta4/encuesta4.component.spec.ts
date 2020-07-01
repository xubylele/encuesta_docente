import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Encuesta4Component } from './encuesta4.component';

describe('Encuesta4Component', () => {
  let component: Encuesta4Component;
  let fixture: ComponentFixture<Encuesta4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Encuesta4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Encuesta4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
