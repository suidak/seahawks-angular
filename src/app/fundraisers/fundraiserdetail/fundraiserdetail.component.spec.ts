import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundraiserdetailComponent } from './fundraiserdetail.component';

describe('FundraiserdetailComponent', () => {
  let component: FundraiserdetailComponent;
  let fixture: ComponentFixture<FundraiserdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundraiserdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundraiserdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
