import { Injectable } from '@angular/core';
import { SupplierRegisterRequest } from '../../../../core/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierRegisterStore {
  private data: any = {};

  setStepData(stepData: any) {
    this.data = { ...this.data, ...stepData };
  }
  getData() {
    return this.data;
  }
  hasData(): boolean {
    return Object.keys(this.data).length > 0;
  }

  clear() {
    this.data = {};
  }
}
