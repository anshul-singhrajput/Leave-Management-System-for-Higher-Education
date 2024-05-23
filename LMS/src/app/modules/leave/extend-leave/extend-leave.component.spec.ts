import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendLeaveComponent } from './extend-leave.component';

describe('ExtendLeaveComponent', () => {
  let component: ExtendLeaveComponent;
  let fixture: ComponentFixture<ExtendLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendLeaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtendLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
