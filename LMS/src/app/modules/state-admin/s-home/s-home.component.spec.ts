import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SHomeComponent } from './s-home.component';

describe('SHomeComponent', () => {
  let component: SHomeComponent;
  let fixture: ComponentFixture<SHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
