import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
@Component({
  selector: 'app-pagination',
  imports: [LucideAngularModule, PaginatorModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  first: number = 0;

  @Input() rowsPerPage!: number;
  @Input() totalRecords!: number;

  // Output event
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(event: PaginatorState) {
    this.first = event.first!;

    console.log('Page changed:', event);
    console.log('Page changed:', event.page);
    this.pageChange.emit(event.page!);
  }
}
