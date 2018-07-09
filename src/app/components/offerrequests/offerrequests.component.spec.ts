import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferrequestsComponent } from './offerrequests.component';

describe('OfferrequestsComponent', () => {
  let component: OfferrequestsComponent;
  let fixture: ComponentFixture<OfferrequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferrequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
