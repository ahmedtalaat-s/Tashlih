import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSuppliers } from './search-suppliers';

describe('SearchSuppliers', () => {
  let component: SearchSuppliers;
  let fixture: ComponentFixture<SearchSuppliers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSuppliers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSuppliers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
