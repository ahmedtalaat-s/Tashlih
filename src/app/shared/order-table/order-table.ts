import { Component, computed, inject, Input, PLATFORM_ID } from '@angular/core';
import { LucideAngularModule, Wrench, Box, Calendar, XIcon, TriangleAlert } from 'lucide-angular';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  getOrderParams,
  MyOrderItem,
  MyOrdersResponse,
  OrderStatus,
} from '../../core/models/customerOrders.model';
import { LanguageService } from '../../core/services/language.service';
import { CustomerOrdersService } from '../../core/services/customer-orders.service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../core/services/toast.service';
@Component({
  selector: 'app-order-table',
  imports: [LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './order-table.html',
  styleUrl: './order-table.css',
})
export class OrderTable {
  readonly WrenchIcon = Wrench;
  readonly BoxIcon = Box;
  readonly CalendarIcon = Calendar;
  readonly XIcon = XIcon;
  readonly TriangleAlert = TriangleAlert;

  @Input({ required: true }) currentOrdersBool!: boolean;

  orders!: MyOrderItem[];

  private language = inject(LanguageService);
  private orderService = inject(CustomerOrdersService);
  private platform = inject(PLATFORM_ID);
  private toastService = inject(ToastService);

  statusMap: Record<OrderStatus, { ar: string; en: string; class: string }> = {
    pending: { ar: 'في الانتظار', en: 'Pending', class: 'status-pending' },
    processing: { ar: 'جاري التجهيز', en: 'Processing', class: 'status-processing' },
    completed: { ar: 'تم التوصيل', en: 'Completed', class: 'status-completed' },
    received: { ar: 'مكتمل', en: 'Received', class: 'status-received' },
    cancelled: { ar: 'ملغي', en: 'Cancelled', class: 'status-cancelled' },
    rejected: { ar: 'مرفوض', en: 'Rejected', class: 'status-rejected' },
  };

  statuses: OrderStatus[] = Object.keys(this.statusMap) as OrderStatus[];
  selectedStatus: OrderStatus | 'all' = 'all';
  currentLang = computed<'ar' | 'en'>(() => this.language.defaultLanguage() as any); // This should come from your Translation Service
  pagination!: MyOrdersResponse['pagination'];
  page = 1;

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    const params: getOrderParams = {
      page: this.page,
      pageSize: 5,
    };
    this.selectedStatus == 'all'
      ? (params.status = undefined)
      : (params.status = this.selectedStatus as OrderStatus);

    if (isPlatformBrowser(this.platform)) {
      this.orderService.getMyOrders(params).subscribe({
        next: (res) => {
          this.orders = res.orders;
          this.pagination = res.pagination;
          console.log(res);
        },
      });
    }
  }
  // Action Handlers
  cancelOrder(order: any) {
    this.isCancelModalOpen = true;
    this.selectedOrder = order;
    this.cancelReason = '';
  }

  markAsReceived(order: MyOrderItem) {
    this.orderService.completeOrder(order.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.language.defaultLanguage() == 'ar'
            ? this.toastService.success('تم بنجاح', 'تم استلام  الطلب')
            : this.toastService.success('Success', 'the order has been received');
        }
        this.getOrders();
      },
    });
  }

  filter(status: OrderStatus | 'all') {
    this.selectedStatus = status;
    this.getOrders();
  }
  pageChange(pageNum: number) {
    this.page = pageNum;
    this.getOrders();
  }

  // cancel modal logic
  isCancelModalOpen = false;
  cancelReason = '';
  selectedOrder!: MyOrderItem;

  closeCancelModal() {
    this.isCancelModalOpen = false;
  }

  confirmCancellation() {
    this.orderService
      .cancelOrder(this.selectedOrder.id, { cancelReason: this.cancelReason })
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.language.defaultLanguage() == 'ar'
              ? this.toastService.success('تم بنجاح', 'تم حذف الطلب')
              : this.toastService.success('Success', 'the order has been deleted');
          }
          this.getOrders();
        },
      });
    this.closeCancelModal();
  }
}
