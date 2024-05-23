import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLeaveApplicationHistoryComponent } from './report-leave-application-history.component';

describe('ReportLeaveApplicationHistoryComponent', () => {
  let component: ReportLeaveApplicationHistoryComponent;
  let fixture: ComponentFixture<ReportLeaveApplicationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportLeaveApplicationHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportLeaveApplicationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
