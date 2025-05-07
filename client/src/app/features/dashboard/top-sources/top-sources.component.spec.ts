import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSourcesComponent } from './top-sources.component';

describe('TopSourcesComponent', () => {
  let component: TopSourcesComponent;
  let fixture: ComponentFixture<TopSourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
