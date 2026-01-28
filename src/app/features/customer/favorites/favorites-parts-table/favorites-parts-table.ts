import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { LucideAngularModule, Wrench, Box, Calendar, X } from 'lucide-angular';
import { Pagination } from '../../../../shared/pagination/pagination';
import { FavoritePart } from '../../../../core/models/parts.model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-favorites-parts-table',
  imports: [LucideAngularModule, Pagination, DatePipe],
  templateUrl: './favorites-parts-table.html',
  styleUrl: './favorites-parts-table.css',
})
export class FavoritesPartsTable {
  readonly wrenchIcon = Wrench;
  readonly boxIcon = Box;
  readonly calendarIcon = Calendar;
  readonly xIcon = X;

  private router = inject(Router);

  @Input() data: FavoritePart[] = [];
  @Input() totalCount!: number;
  @Input() search = '';
  @Output() delete = new EventEmitter<number>();

  paginatedParts!: FavoritePart[];
  filteredParts!: FavoritePart[];
  paginationIndex: number = 0;
  rowsPerPage = 5;
  currentPage = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['search']) {
      this.currentPage = 0;
      this.updatePaginatedParts();
    }
  }
  updatePaginatedParts() {
    this.filteredParts = this.search
      ? this.data.filter((part) => part.partName.toLowerCase().includes(this.search.toLowerCase()))
      : [...this.data];
    const startIndex = this.currentPage * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;

    this.paginatedParts = this.filteredParts.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedParts();
  }

  navigateToPartDetails(id: any) {
    this.router.navigate(['/details', id]);
  }
}
