import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VerifySupplierRequest } from '../../../../../../core/models/admin.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reject-request',
  imports: [FormsModule],
  templateUrl: './reject-request.html',
  styleUrl: './reject-request.css',
})
export class RejectRequest {
  @Input() supplierId!: number;
  @Output() close = new EventEmitter<void>();
  @Output() submitRejection = new EventEmitter<VerifySupplierRequest>();

  request: VerifySupplierRequest = {
    supplierId: 0,
    isApproved: false,
    rejectionReason: '',
    adminNotes: '',
    requiredDocuments: [],
  };

  rejectionOptions = [
    'وثائق غير واضحة أو غير مقروءة',
    'معلومات السجل التجاري غير مطابقة',
    'الهوية الوطنية منتهية الصلاحية',
    'وثائق مزورة أو مشبوهة',
    'معلومات ناقصة',
    'أخرى',
  ];

  documentOptions = [
    { label: 'الهوية الوطنية ', value: 'frontID' },
    { label: 'السجل التجاري', value: 'commercialRegister' },
  ];

  toggleDocument(docValue: string) {
    const index = this.request.requiredDocuments?.indexOf(docValue);
    if (index !== undefined && index > -1) {
      this.request.requiredDocuments?.splice(index, 1);
    } else {
      this.request.requiredDocuments?.push(docValue);
    }
  }

  onConfirm() {
    this.request.supplierId = this.supplierId;
    this.submitRejection.emit(this.request);
  }
}
