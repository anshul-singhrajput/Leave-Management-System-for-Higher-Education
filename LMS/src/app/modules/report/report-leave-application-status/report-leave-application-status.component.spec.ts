import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLeaveApplicationStatusComponent } from './report-leave-application-status.component';

describe('ReportLeaveApplicationStatusComponent', () => {
  let component: ReportLeaveApplicationStatusComponent;
  let fixture: ComponentFixture<ReportLeaveApplicationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportLeaveApplicationStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportLeaveApplicationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
