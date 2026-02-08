export interface createOrderRequest {
  partId: number;
  quantity: number;
  customerNotes?: string;
}

export interface getOrderParams {
  status?: OrderStatus;
  page?: number;
  pageSize?: number;
}

export type OrderStatus =
  | 'pending' // في الانتظار
  | 'processing' // جاري التجهيز
  | 'completed' // تم التوصيل
  | 'received' // مكتمل
  | 'cancelled' // ملغي
  | 'rejected'; // مرفوض

export type OrderAction = 'cancel' | 'received';

export interface CreateOrderResponse {
  success: boolean;
  message: string | null;
  messageAr: string | null;
  order: CustomerOrder;
}

/* ================= ORDER ================= */

export interface CustomerOrder {
  id: number;
  orderNumber: string;

  customerId: number;
  customerName: string;
  customerPhone: string;
  customerAvatar: string | null;

  supplierId: number;
  supplierName: string;
  supplierPhone: string;
  supplierLogo: string | null;

  item: CustomerOrderItem;

  subtotal: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;

  status: OrderStatus;
  statusAr: string;

  customerNotes: string | null;
  supplierNotes: string | null;
  cancelReason: string | null;

  createdAt: string;
  confirmedAt: string | null;
  processingAt: string | null;
  completedAt: string | null;
  receivedAt: string | null;
  cancelledAt: string | null;

  availableActions: OrderAction[];
}

/* ================= ITEM ================= */

export interface CustomerOrderItem {
  id: number;
  partId: number;
  partName: string;
  partNumber: string;
  condition: string;
  imageUrl: string | null;

  quantity: number;
  unitPrice: number;
  totalPrice: number;

  warrantyDays: number;
  notes: string | null;
}

// my order response
export interface MyOrdersResponse {
  orders: MyOrderItem[];
  pagination: Pagination;

  success: boolean;
  message: string | null;
  messageAr: string | null;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
export interface MyOrderItem {
  id: number;
  orderNumber: string;

  otherPartyId: number;
  otherPartyName: string;
  otherPartyImage: string | null;

  partName: string;
  partImage: string | null;

  quantity: number;
  totalAmount: number;
  currency: string;

  status: OrderStatus;
  statusAr: string;

  createdAt: string; // ISO date
}

export interface OrderCancelResponse {
  success: boolean;
  message: string | null;
  messageAr: string | null;
}
export interface OrderCompleteResponse {
  success: boolean;
  message: string | null;
  messageAr: string | null;
}
