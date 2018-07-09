import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfundraiserComponent } from './addfundraiser.component';

describe('AddfundraiserComponent', () => {
  let component: AddfundraiserComponent;
  let fixture: ComponentFixture<AddfundraiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfundraiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfundraiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
