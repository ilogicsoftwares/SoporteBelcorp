import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaOpConsultoraComponent } from './consulta-op-consultora.component';

describe('ConsultaOpConsultoraComponent', () => {
  let component: ConsultaOpConsultoraComponent;
  let fixture: ComponentFixture<ConsultaOpConsultoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaOpConsultoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaOpConsultoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
