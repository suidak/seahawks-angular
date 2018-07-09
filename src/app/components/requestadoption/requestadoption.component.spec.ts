import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestadoptionComponent } from './requestadoption.component';

describe('RequestadoptionComponent', () => {
  let component: RequestadoptionComponent;
  let fixture: ComponentFixture<RequestadoptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestadoptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestadoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
