import { Component, inject, signal } from '@angular/core';
import { CheckOtpcode } from '../check-otpcode/check-otpcode';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../../core/models/auth.model';
import { ToastService } from '../../../core/services/toast.service';
import { LanguageService } from '../../../core/services/language.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CheckOtpcode, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  showOtp = signal(false);
  loginWithPassword = signal(false);

  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  private languageService = inject(LanguageService);
  private authService = inject(AuthService);

  loginForm = this.fb.group({
    phone: ['', [Validators.required, Validators.pattern(/^5\d{8}$/)]],
    password: [''],
  });

  toggleLoginMethod() {
    this.loginWithPassword.update((v) => !v);

    if (this.loginWithPassword()) {
      this.loginForm.controls.password.setValidators([
        Validators.required,
        Validators.minLength(6),
      ]);
    } else {
      this.loginForm.controls.password.clearValidators();
      this.loginForm.controls.password.reset();
    }

    this.loginForm.controls.password.updateValueAndValidity();
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { phone, password } = this.loginForm.value;

    if (this.loginWithPassword()) {
      // login with password
      const LoginRequest: LoginRequest = {
        phone: this.getPhoneWithCode(phone!),
        password: password!,
      };
      this.authService.login(LoginRequest).subscribe({
        next: (response) => {
          if (response.success) {
            this.languageService.defaultLanguage() === 'ar'
              ? this.toastService.success('تم تسجيل الدخول بنجاح', response.messageAr)
              : this.toastService.success('Login Successful', response.message);
          }
        },
      });
    } else {
      const phoneWithCode = this.getPhoneWithCode(phone!);
      this.authService.sendOtpCode(phoneWithCode, 'login').subscribe({
        next: (response) => {
          if (response.success) {
            this.showOtp.set(true);
            this.languageService.defaultLanguage() === 'ar'
              ? this.toastService.success('تم إرسال رمز التحقق', response.messageAr)
              : this.toastService.success('OTP Sent Successfully', response.message);

            console.log('otp code', response.otpCode);
          }
        },
      });
    }
  }

  //helper for phone
  getPhoneWithCode(phone: string): string {
    return '+966' + phone;
  }
  //handle otp
  handleOtpLogin(otpCode: string) {
    const phone = this.getPhoneWithCode(this.loginForm.value.phone!);

    this.authService.loginWithOtp({ phone, otpCode }).subscribe({
      next: (response) => {
        if (response.success) {
          this.showOtp.set(false);
          this.languageService.defaultLanguage() === 'ar'
            ? this.toastService.success('تم تسجيل الدخول بنجاح', response.messageAr)
            : this.toastService.success('Login Successful', response.message);
        }
      },
    });
  }

  closeOtp() {
    this.showOtp.set(false);
  }
}
