import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';
import { LanguageService } from '../../../../../core/services/language.service';
import { SupplierRegisterStore } from '../supplier-register.store';
import { get } from 'http';
import { UserService } from '../../../../../core/services/user.service';

@Component({
  selector: 'app-supplier-register-info',
  imports: [ReactiveFormsModule],
  templateUrl: './supplier-register-info.html',
  styleUrl: './supplier-register-info.css',
})
export class SupplierRegisterInfo {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(SupplierRegisterStore);
  private languageService = inject(LanguageService);
  private userService = inject(UserService);

  registerForm = this.fb.nonNullable.group(
    {
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^5\d{8}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, Validators.requiredTrue],
    },
    { validators: this.matchPassword }
  );

  matchPassword(form: any) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (!password || !confirmPassword) return null;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  //oninit
  ngOnInit() {
    const data = this.store.getData();

    if (data) {
      this.registerForm.patchValue({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone?.split('+966')[1],
      });
    }
  }

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

    const registerData = {
      fullName: this.getValue('fullName'),
      email: this.getValue('email'),
      phone: this.getPhoneWithCode(this.getValue('phone')),
      password: this.getValue('password'),
      preferredLanguage: this.languageService.defaultLanguage(),
    };
    this.store.setStepData(registerData);
    this.userService.phoneNumber = registerData.phone;
    this.router.navigate(['/auth/register/supplier/business-info']);
  }
  getPhoneWithCode(phone: string): string {
    return '+966' + phone;
  }

  //handle password visibility
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  togglePassword() {
    this.showPassword.update((v) => !v);
  }
  toggleConfirmPassword() {
    this.showConfirmPassword.update((v) => !v);
  }
}
