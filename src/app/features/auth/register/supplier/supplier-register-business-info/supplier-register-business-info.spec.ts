import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRegisterBusinessInfo } from './supplier-register-business-info';

describe('SupplierRegisterBusinessInfo', () => {
  let component: SupplierRegisterBusinessInfo;
  let fixture: ComponentFixture<SupplierRegisterBusinessInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierRegisterBusinessInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierRegisterBusinessInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
