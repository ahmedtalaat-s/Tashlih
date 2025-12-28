import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRegisterInfo } from './supplier-register-info';

describe('SupplierRegisterInfo', () => {
  let component: SupplierRegisterInfo;
  let fixture: ComponentFixture<SupplierRegisterInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierRegisterInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierRegisterInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
