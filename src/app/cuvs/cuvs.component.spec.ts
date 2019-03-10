import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuvsComponent } from './cuvs.component';

describe('CuvsComponent', () => {
  let component: CuvsComponent;
  let fixture: ComponentFixture<CuvsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuvsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
