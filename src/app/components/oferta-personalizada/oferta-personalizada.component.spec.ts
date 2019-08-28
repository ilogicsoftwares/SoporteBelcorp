import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaPersonalizadaComponent } from './oferta-personalizada.component';

describe('OfertaPersonalizadaComponent', () => {
  let component: OfertaPersonalizadaComponent;
  let fixture: ComponentFixture<OfertaPersonalizadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertaPersonalizadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaPersonalizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
