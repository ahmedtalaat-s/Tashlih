import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';
import { LanguageService } from '../../../../../core/services/language.service';

@Component({
  selector: 'app-supplier-register-info',
  imports: [ReactiveFormsModule],
  templateUrl: './supplier-register-info.html',
  styleUrl: './supplier-register-info.css',
})
export class SupplierRegisterInfo {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private languageService = inject(LanguageService);

  registerForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^05\d{8}$/)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    terms: [false, Validators.requiredTrue],
  });

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
      phone: this.getValue('phone'),
      password: this.getValue('password'),
      preferredLanguage: this.languageService.defaultLanguage(),
    };
    console.log('Form Data:', registerData);
  }

  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update((v) => !v);
  }
}
