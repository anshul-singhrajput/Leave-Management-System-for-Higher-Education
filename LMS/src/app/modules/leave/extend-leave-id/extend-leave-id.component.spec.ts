import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendLeaveIdComponent } from './extend-leave-id.component';

describe('ExtendLeaveIdComponent', () => {
  let component: ExtendLeaveIdComponent;
  let fixture: ComponentFixture<ExtendLeaveIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendLeaveIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtendLeaveIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
