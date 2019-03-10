import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavcontextComponent } from './navcontext.component';

describe('NavcontextComponent', () => {
  let component: NavcontextComponent;
  let fixture: ComponentFixture<NavcontextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavcontextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavcontextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
