import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FavoritePart } from '../../model/favorite-part';
import { LucideAngularModule, Wrench, Box, Calendar, X } from 'lucide-angular';
import { Pagination } from '../../../../shared/pagination/pagination';

@Component({
  selector: 'app-favorites-parts-table',
  imports: [LucideAngularModule, Pagination],
  templateUrl: './favorites-parts-table.html',
  styleUrl: './favorites-parts-table.css',
})
export class FavoritesPartsTable {
  readonly wrenchIcon = Wrench;
  readonly boxIcon = Box;
  readonly calendarIcon = Calendar;
  readonly xIcon = X;

  @Input() data: FavoritePart[] = [];
  @Input() search = '';

  @Output() delete = new EventEmitter<number>();
  @Output() viewDetails = new EventEmitter<number>();

  get filteredData(): FavoritePart[] {
    return this.data.filter((part) => part.name.includes(this.search));
  }
}
