import { Component, Input } from '@angular/core';
import { LucideAngularModule, Wrench, Box, Calendar } from 'lucide-angular';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-order-table',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './order-table.html',
  styleUrl: './order-table.css',
})
export class OrderTable {
  readonly WrenchIcon = Wrench;
  readonly BoxIcon = Box;
  readonly CalendarIcon = Calendar;

  @Input({ required: true }) currentOrdersBool!: boolean;
}
