import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionrequestComponent } from './adoptionrequest.component';

describe('AdoptionrequestComponent', () => {
  let component: AdoptionrequestComponent;
  let fixture: ComponentFixture<AdoptionrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptionrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
