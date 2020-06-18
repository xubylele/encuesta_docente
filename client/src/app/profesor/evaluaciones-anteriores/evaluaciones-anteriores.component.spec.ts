import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesAnterioresComponent } from './evaluaciones-anteriores.component';

describe('EvaluacionesAnterioresComponent', () => {
  let component: EvaluacionesAnterioresComponent;
  let fixture: ComponentFixture<EvaluacionesAnterioresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionesAnterioresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionesAnterioresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
