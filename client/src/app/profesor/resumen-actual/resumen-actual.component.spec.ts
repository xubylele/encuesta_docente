import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenActualComponent } from './resumen-actual.component';

describe('ResumenActualComponent', () => {
  let component: ResumenActualComponent;
  let fixture: ComponentFixture<ResumenActualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenActualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
