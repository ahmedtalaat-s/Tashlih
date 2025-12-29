import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SupplierRegisterStore } from '../supplier-register.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-register-files',
  imports: [ReactiveFormsModule],
  templateUrl: './supplier-register-files.html',
  styleUrl: './supplier-register-files.css',
})
export class SupplierRegisterFiles {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(SupplierRegisterStore);

  constructor() {
    console.log(this.store.getData());
  }

  documentsForm = this.fb.nonNullable.group({
    commercialRegisterCopy: [null, Validators.required],
    nationalId: [null, Validators.required],
    commercialRegisterNumber: ['', Validators.required],
  });

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

    const formData = new FormData();
    Object.entries(this.documentsForm.getRawValue()).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    console.log('Documents ready:', formData);
  }

  //navigate back
  goBack() {
    this.router.navigate(['/auth/register/supplier/business-info']);
  }
}
