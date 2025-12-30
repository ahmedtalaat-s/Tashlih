import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SupplierRegisterStore } from '../supplier-register.store';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';
import { CheckOtpcode } from '../../../check-otpcode/check-otpcode';
import { ToastService } from '../../../../../core/services/toast.service';
import { UserService } from '../../../../../core/services/user.service';
import { LanguageService } from '../../../../../core/services/language.service';

@Component({
  selector: 'app-supplier-register-files',
  imports: [ReactiveFormsModule, CheckOtpcode],
  templateUrl: './supplier-register-files.html',
  styleUrl: './supplier-register-files.css',
})
export class SupplierRegisterFiles {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private store = inject(SupplierRegisterStore);
  private router = inject(Router);
  private toasterService = inject(ToastService);
  private userService = inject(UserService);
  private languageService = inject(LanguageService);

  showOtpCheck = signal(false);

  documentsForm = this.fb.nonNullable.group({
    commercialRegisterCopy: [null, Validators.required],
    nationalId: [null, Validators.required],
    commercialRegisterNumber: ['', Validators.required],
  });

  ngOnInit() {
    const data = this.store.getData();

    if (data) {
      this.documentsForm.patchValue({
        commercialRegisterNumber: data.commercialRegisterNumber,
        commercialRegisterCopy: data.commercialRegisterImage,
        nationalId: data.identityImage,
      });
    }
  }

  submitted = signal(false);

  formStatus = toSignal(this.documentsForm.statusChanges, {
    initialValue: this.documentsForm.status,
  });

  isFormInvalid = computed(() => this.formStatus() === 'INVALID');

  hasError(controlName: string, errorName: string) {
    const c = this.documentsForm.get(controlName);
    return c?.hasError(errorName) && (c?.touched || this.submitted());
  }

  hasFile(controlName: string): boolean {
    return !!this.documentsForm.get(controlName)?.value;
  }

  getFileName(controlName: string): string | null {
    const file = this.documentsForm.get(controlName)?.value as File | null;
    return file ? file.name : null;
  }

  onFileSelect(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.documentsForm.get(controlName)?.setValue(file);
    this.documentsForm.get(controlName)?.markAsTouched();
  }

  submit() {
    this.submitted.set(true);
    if (this.documentsForm.invalid) return;

    const data = this.store.getData();

    const payload = {
      ...data,
      commercialRegisterNumber: this.documentsForm.value.commercialRegisterNumber,
      commercialRegisterImage: this.documentsForm.value.commercialRegisterCopy!,
      identityImage: this.documentsForm.value.nationalId!,
    };

    this.authService.registerSupplier(payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.showOtpCheck.set(true);
          if (this.languageService.defaultLanguage() === 'ar') {
            this.toasterService.success('تم التسجيل بنجاح', response.messageAr);
            console.log('otp code', response.otpCode);
          } else {
            this.toasterService.success('Registration Successful', response.message);
          }
        }
        this.store.clear();
        // this.router.navigate(['/register-success']);
      },
      error: (err) => console.error(err),
    });
  }

  //navigate back
  goBack() {
    this.router.navigate(['/auth/register/supplier/business-info']);
  }

  //handle otp verify
  handleOtpVerify(otp: string) {
    // Implement OTP verification logic here
    const phone = this.userService.phoneNumber;
    if (phone) {
      this.authService.verifyOtpCode(phone, otp).subscribe({
        next: (response) => {
          if (response.success) {
            this.showOtpCheck.set(false);
            this.languageService.defaultLanguage() === 'ar'
              ? this.toasterService.success('تم التحقق من رمز التحقق', response.messageAr)
              : this.toasterService.success('OTP Verified Successfully', response.message);
          }
        },
      });
    }
  }

  closeOtp() {
    this.showOtpCheck.set(false);
  }
}
