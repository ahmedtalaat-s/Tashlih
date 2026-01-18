import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';
@Component({
  selector: 'app-pagination',
  imports: [LucideAngularModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  // Inputs
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 10; // total pages
  @Input() maxVisible: number = 5; // max page numbers visible at once

  // Output event
  @Output() pageChange = new EventEmitter<number>();

  // Lucide Icons
  readonly ChevronLeftIcon = ChevronLeft;
  readonly ChevronRightIcon = ChevronRight;

  get pages(): number[] {
    const pages: number[] = [];
    let start = Math.max(this.currentPage - Math.floor(this.maxVisible / 2), 1);
    let end = Math.min(start + this.maxVisible - 1, this.totalPages);

    // adjust start if we're near the end
    start = Math.max(end - this.maxVisible + 1, 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  selectPage(page: number) {
    if (page === this.currentPage) return;
    this.pageChange.emit(page);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }
}
