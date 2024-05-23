import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinLeaveComponent } from './join-leave.component';

describe('JoinLeaveComponent', () => {
  let component: JoinLeaveComponent;
  let fixture: ComponentFixture<JoinLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinLeaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
