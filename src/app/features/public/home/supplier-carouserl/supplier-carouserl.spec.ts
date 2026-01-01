import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCarouserl } from './supplier-carouserl';

describe('SupplierCarouserl', () => {
  let component: SupplierCarouserl;
  let fixture: ComponentFixture<SupplierCarouserl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierCarouserl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierCarouserl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
