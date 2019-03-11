import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTinybaseComponent } from './form-tinybase.component';

describe('FormTinybaseComponent', () => {
  let component: FormTinybaseComponent;
  let fixture: ComponentFixture<FormTinybaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTinybaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTinybaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
