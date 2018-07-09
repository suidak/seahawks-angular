import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionofferComponent } from './adoptionoffer.component';

describe('AdoptionofferComponent', () => {
  let component: AdoptionofferComponent;
  let fixture: ComponentFixture<AdoptionofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptionofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
