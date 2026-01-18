import { Component } from '@angular/core';
import { FavoriteSupplier } from '../model/favorite-supplier';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FavoritesSuppliersTable } from './favorites-suppliers-table/favorites-suppliers-table';
import { FavoritesPartsTable } from './favorites-parts-table/favorites-parts-table';
import { FavoritePart } from '../model/favorite-part';
import { LucideAngularModule, Search } from 'lucide-angular';

type FavoritesTab = 'parts' | 'suppliers';

@Component({
  selector: 'app-favorites',
  imports: [
    FormsModule,
    CommonModule,
    FavoritesSuppliersTable,
    FavoritesPartsTable,
    LucideAngularModule,
  ],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  readonly searchIcon = Search;
  openPartDetails($event: number) {
    throw new Error('Method not implemented.');
  }
  activeTab: FavoritesTab = 'parts';
  searchTerm: string = '';

  suppliers: FavoriteSupplier[] = [
    {
      id: 1,
      name: 'مركز البركة',
      specialization: 'شراء وبيع قطع غيار',
      date: '31 يناير 2025',
    },
    {
      id: 2,
      name: 'مركز البركة',
      specialization: 'شراء وبيع قطع غيار',
      date: '31 يناير 2025',
    },
    {
      id: 1,
      name: 'مركز البركة',
      specialization: 'شراء وبيع قطع غيار',
      date: '31 يناير 2025',
    },
    {
      id: 2,
      name: 'مركز البركة',
      specialization: 'شراء وبيع قطع غيار',
      date: '31 يناير 2025',
    },
    {
      id: 2,
      name: 'مركز البركة',
      specialization: 'شراء وبيع قطع غيار',
      date: '31 يناير 2025',
    },
  ];
  parts: FavoritePart[] = [
    {
      id: 1,
      name: 'فرامل أمامية',
      type: 'محرك',
      quantity: 5,
      date: '31 يناير 2025',
    },
    {
      id: 2,
      name: 'فلتر زيت',
      type: 'محرك',
      quantity: 2,
      date: '28 يناير 2025',
    },
    {
      id: 3,
      name: 'بطارية',
      type: 'كهرباء',
      quantity: 1,
      date: '25 يناير 2025',
    },
    {
      id: 2,
      name: 'فلتر زيت',
      type: 'محرك',
      quantity: 2,
      date: '28 يناير 2025',
    },
    {
      id: 3,
      name: 'بطارية',
      type: 'كهرباء',
      quantity: 1,
      date: '25 يناير 2025',
    },
  ];

  setTab(tab: FavoritesTab) {
    this.activeTab = tab;
  }
  deleteSupplier(id: number) {
    this.suppliers = this.suppliers.filter((s) => s.id !== id);
  }
  deletePart(id: number) {
    this.parts = this.parts.filter((s) => s.id !== id);
  }
}
