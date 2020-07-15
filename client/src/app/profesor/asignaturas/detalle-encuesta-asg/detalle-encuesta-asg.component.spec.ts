import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEncuestaAsgComponent } from './detalle-encuesta-asg.component';

describe('DetalleEncuestaAsgComponent', () => {
  let component: DetalleEncuestaAsgComponent;
  let fixture: ComponentFixture<DetalleEncuestaAsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleEncuestaAsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEncuestaAsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
