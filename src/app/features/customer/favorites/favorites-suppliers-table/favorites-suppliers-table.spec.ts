import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesSuppliersTable } from './favorites-suppliers-table';

describe('FavoritesSuppliersTable', () => {
  let component: FavoritesSuppliersTable;
  let fixture: ComponentFixture<FavoritesSuppliersTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesSuppliersTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesSuppliersTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
