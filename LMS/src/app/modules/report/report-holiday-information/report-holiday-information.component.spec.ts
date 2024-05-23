import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportHolidayInformationComponent } from './report-holiday-information.component';

describe('ReportHolidayInformationComponent', () => {
  let component: ReportHolidayInformationComponent;
  let fixture: ComponentFixture<ReportHolidayInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportHolidayInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportHolidayInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
