import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOtpcode } from './check-otpcode';

describe('CheckOtpcode', () => {
  let component: CheckOtpcode;
  let fixture: ComponentFixture<CheckOtpcode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckOtpcode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOtpcode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
