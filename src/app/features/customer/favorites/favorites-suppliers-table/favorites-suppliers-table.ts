import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FavoriteSupplier } from '../../model/favorite-supplier';
import { Calendar, LucideAngularModule, Wrench, X } from 'lucide-angular';
import { Pagination } from '../../../../shared/pagination/pagination';

@Component({
  selector: 'app-favorites-suppliers-table',
  imports: [LucideAngularModule, Pagination],
  templateUrl: './favorites-suppliers-table.html',
  styleUrl: './favorites-suppliers-table.css',
})
export class FavoritesSuppliersTable {
  readonly wrenchIcon = Wrench;
  readonly calendarIcon = Calendar;
  readonly xIcon = X;

  @Input() data: FavoriteSupplier[] = [];
  @Input() search = '';
  @Output() delete = new EventEmitter<number>();
}
