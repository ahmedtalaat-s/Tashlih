import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesPartsTable } from './favorites-parts-table';

describe('FavoritesPartsTable', () => {
  let component: FavoritesPartsTable;
  let fixture: ComponentFixture<FavoritesPartsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesPartsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesPartsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
