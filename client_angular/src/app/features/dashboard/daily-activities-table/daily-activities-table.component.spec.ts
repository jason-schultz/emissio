import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyActivitiesTableComponent } from './daily-activities-table.component';

describe('DailyActivitiesTableComponent', () => {
  let component: DailyActivitiesTableComponent;
  let fixture: ComponentFixture<DailyActivitiesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyActivitiesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyActivitiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
