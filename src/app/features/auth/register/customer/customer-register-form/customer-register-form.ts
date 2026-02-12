import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';
import { LanguageService } from '../../../../../core/services/language.service';
import { registerCustomerRequest } from '../../../../../core/models/auth.model';
import { ToastService } from '../../../../../core/services/toast.service';
import { CheckOtpcode } from '../../../check-otpcode/check-otpcode';
import { UserService } from '../../../../../core/services/user.service';

@Component({
  selector: 'app-customer-register-form',
  imports: [ReactiveFormsModule, CheckOtpcode, RouterLink],
  templateUrl: './customer-register-form.html',
  styleUrl: './customer-register-form.css',
})
export class CustomerRegisterForm {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private languageService = inject(LanguageService);
  private toasterService = inject(ToastService);
  private userService = inject(UserService);

  showOtpCheck = signal(false);

  registerForm = this.fb.nonNullable.group(
    {
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^5\d{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, Validators.requiredTrue],
    },
    { validators: this.matchPassword },
  );

  submitted = signal(false);
  formStatus = toSignal(this.registerForm.statusChanges, {
    initialValue: this.registerForm.status,
  });
  isFormInvalid = computed(() => this.formStatus() === 'INVALID');

  hasError(controlName: string, errorName: string) {
    const c = this.registerForm.get(controlName);
    return c?.hasError(errorName) && (c?.touched || this.submitted());
  }
  getValue(controlName: string) {
    return this.registerForm.get(controlName)?.value;
  }

  submit() {
    this.submitted.set(true);
    if (this.registerForm.invalid) return;

    const registerData: registerCustomerRequest = {
      fullName: this.getValue('fullName'),
      phone: this.getPhoneWithCode(this.getValue('phone')),
      email: this.getValue('email'),
      password: this.getValue('password'),
      preferredLanguage: this.languageService.defaultLanguage(),
    };
    this.authService.registerCustomer(registerData).subscribe({
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
      },
    });
  }

  showPassword = signal(false);
  showConfirmPassword = signal(false);

  togglePassword() {
    this.showPassword.update((v) => !v);
  }
  toggleConfirmPassword() {
    this.showConfirmPassword.update((v) => !v);
  }

  getPhoneWithCode(phone: string): string {
    return '+966' + phone;
  }

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
            this.router.navigate(['/']);
          }
        },
      });
    }
  }

  closeOtp() {
    this.showOtpCheck.set(false);
  }

  matchPassword(form: any) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (!password || !confirmPassword) return null;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
