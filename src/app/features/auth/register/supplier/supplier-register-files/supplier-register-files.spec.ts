import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRegisterFiles } from './supplier-register-files';

describe('SupplierRegisterFiles', () => {
  let component: SupplierRegisterFiles;
  let fixture: ComponentFixture<SupplierRegisterFiles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierRegisterFiles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierRegisterFiles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
