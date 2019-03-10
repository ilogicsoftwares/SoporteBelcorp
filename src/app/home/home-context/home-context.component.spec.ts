import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContextComponent } from './home-context.component';

describe('HomeContextComponent', () => {
  let component: HomeContextComponent;
  let fixture: ComponentFixture<HomeContextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeContextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
