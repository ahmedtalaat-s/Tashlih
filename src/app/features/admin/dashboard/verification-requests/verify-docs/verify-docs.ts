import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { SupplierDetails, VerifySupplierRequest } from '../../../../../core/models/admin.model';
import { AdminSupplierService } from '../../../../../core/services/admin/admin.supplier.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../../core/services/toast.service';
import { LanguageService } from '../../../../../core/services/language.service';
import { RejectRequest } from './reject-request/reject-request';

@Component({
  selector: 'app-verify-docs',
  imports: [RejectRequest],
  templateUrl: './verify-docs.html',
  styleUrl: './verify-docs.css',
})
export class VerifyDocs {
  private platform = inject(PLATFORM_ID);
  private supplierService = inject(AdminSupplierService);
  private toastService = inject(ToastService);
  private language = inject(LanguageService);

  supplier!: SupplierDetails | null;
  @Input() supplierId!: any;

  @Output() close = new EventEmitter();
  @Output() accepted = new EventEmitter();

  activeTab: 'id' | 'cr' = 'id';

  setTab(tab: 'id' | 'cr') {
    this.activeTab = tab;
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers() {
    if (isPlatformBrowser(this.platform)) {
      this.supplierService.getSupplierById(this.supplierId).subscribe({
        next: (res) => {
          this.supplier = res.supplier;
        },
      });
    }
  }

  onClose() {
    this.close.emit();
  }

  nextImage() {
    // Logic for slider if multiple images exist
    if ((this.activeTab = 'id')) {
      this.activeTab = 'cr';
    }
  }

  prevImage() {
    // Logic for slider if multiple images exist
    if ((this.activeTab = 'cr')) {
      this.activeTab = 'id';
    }
  }

  accept() {
    const payload: VerifySupplierRequest = {
      supplierId: this.supplier?.id as number,
      isApproved: true,
    };
    this.supplierService.verifySupplier(this.supplierId, payload).subscribe({
      next: (res) => {
        if (res.success) {
          this.language.defaultLanguage() == 'ar'
            ? this.toastService.success('نجاح', res.messageAr)
            : this.toastService.success('Success', res.message);

          this.accepted.emit();
        }
      },
    });
  }

  onReject(payload: VerifySupplierRequest) {
    this.supplierService.verifySupplier(this.supplierId, payload).subscribe({
      next: (res) => {
        if (res.success) {
          this.language.defaultLanguage() == 'ar'
            ? this.toastService.success('نجاح', res.messageAr)
            : this.toastService.success('Success', res.message);

          this.accepted.emit();
        }
      },
    });
  }

  openModalBool = false;
  toggleModal() {
    this.openModalBool = !this.openModalBool;
  }
}
