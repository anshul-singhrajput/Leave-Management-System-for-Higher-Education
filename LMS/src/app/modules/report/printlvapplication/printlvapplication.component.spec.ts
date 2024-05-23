import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintlvapplicationComponent } from './printlvapplication.component';

describe('PrintlvapplicationComponent', () => {
  let component: PrintlvapplicationComponent;
  let fixture: ComponentFixture<PrintlvapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintlvapplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintlvapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
