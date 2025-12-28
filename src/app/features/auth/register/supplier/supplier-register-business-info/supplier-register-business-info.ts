import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-supplier-register-business-info',
  imports: [ReactiveFormsModule],
  templateUrl: './supplier-register-business-info.html',
  styleUrl: './supplier-register-business-info.css',
})
export class SupplierRegisterBusinessInfo {
  private fb = inject(FormBuilder);

  activityForm = this.fb.nonNullable.group({
    activityName: ['', Validators.required],
    activityType: ['', Validators.required],
    commercialRegister: ['', Validators.required],
  });

  submitted = signal(false);

  formStatus = toSignal(this.activityForm.statusChanges, {
    initialValue: this.activityForm.status,
  });

  isFormInvalid = computed(() => this.formStatus() === 'INVALID');

  hasError(controlName: string, errorName: string) {
    const c = this.activityForm.get(controlName);
    return c?.hasError(errorName) && (c?.touched || this.submitted());
  }

  submit() {
    this.submitted.set(true);
    if (this.activityForm.invalid) return;

    console.log('Activity Info:', this.activityForm.getRawValue());
  }
}
