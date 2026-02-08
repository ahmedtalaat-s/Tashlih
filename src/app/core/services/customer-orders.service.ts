import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONSTANTS } from '../../constants/api.constants';
import { Observable } from 'rxjs';
import {
  createOrderRequest,
  CreateOrderResponse,
  getOrderParams,
  MyOrdersResponse,
  OrderCancelResponse,
  OrderCompleteResponse,
} from '../models/customerOrders.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerOrdersService {
  private http = inject(HttpClient);

  // create an order
  createOrder(body: createOrderRequest): Observable<CreateOrderResponse> {
    return this.http.post<CreateOrderResponse>(
      API_CONSTANTS.BASE_URL + API_CONSTANTS.END_POINTS.CUSTOMER_ORDERS.CREATE,
      body,
    );
  }

  // get customer orders
  getMyOrders(params?: getOrderParams): Observable<MyOrdersResponse> {
    let httpParams = new HttpParams();

    if (params) {
      if (params.status) httpParams = httpParams.set('status', params.status);

      if (params.page) httpParams = httpParams.set('page', params.page);

      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    }

    return this.http.get<MyOrdersResponse>(
      API_CONSTANTS.BASE_URL + API_CONSTANTS.END_POINTS.CUSTOMER_ORDERS.MY_ORDERS,
      { params: httpParams },
    );
  }

  // get an order by id
  getOrderById(id: number): Observable<any> {
    return this.http.get(
      API_CONSTANTS.BASE_URL + API_CONSTANTS.END_POINTS.CUSTOMER_ORDERS.DETAILS(id),
    );
  }

  completeOrder(id: number): Observable<OrderCompleteResponse> {
    return this.http.put<OrderCompleteResponse>(
      API_CONSTANTS.BASE_URL + API_CONSTANTS.END_POINTS.CUSTOMER_ORDERS.COMPLETE(id),
      {},
    );
  }

  cancelOrder(id: number, body: { cancelReason: string }): Observable<OrderCancelResponse> {
    return this.http.put<OrderCancelResponse>(
      API_CONSTANTS.BASE_URL + API_CONSTANTS.END_POINTS.CUSTOMER_ORDERS.CANCEL(id),
      body,
    );
  }
}
