import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SApproveLeaveComponent } from './s-approve-leave.component';

describe('SApproveLeaveComponent', () => {
  let component: SApproveLeaveComponent;
  let fixture: ComponentFixture<SApproveLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SApproveLeaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SApproveLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
