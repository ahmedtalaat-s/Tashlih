import { Component, signal } from '@angular/core';
import { LucideAngularModule, Search, ChevronLeft, ChevronRight } from 'lucide-angular';
import { OrderTable } from '../../../shared/order-table/order-table';
import { Pagination } from '../../../shared/pagination/pagination';

@Component({
  selector: 'app-client-orders',
  imports: [LucideAngularModule, OrderTable, Pagination],
  templateUrl: './client-orders.html',
  styleUrl: './client-orders.css',
})
export class ClientOrders {
  readonly SearchIcon = Search;
  readonly ChevronLeftIcon = ChevronLeft;
  readonly ChevronRightIcon = ChevronRight;

  currentOrdersBool = signal<boolean>(true);
}
