import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionSummaryComponent } from './emission-summary.component';

describe('EmissionSummaryComponent', () => {
  let component: EmissionSummaryComponent;
  let fixture: ComponentFixture<EmissionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmissionSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmissionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
