import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { SupplierRegisterStore } from '../supplier-register.store';
import { Router } from '@angular/router';
import { LucideAngularModule, Building2, MapPinHouseIcon } from 'lucide-angular';

@Component({
  selector: 'app-supplier-register-business-info',
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './supplier-register-business-info.html',
  styleUrl: './supplier-register-business-info.css',
})
export class SupplierRegisterBusinessInfo {
  private fb = inject(FormBuilder);
  private store = inject(SupplierRegisterStore);
  private router = inject(Router);

  //icons
  readonly building2 = Building2;
  readonly mapPinHouse = MapPinHouseIcon;

  activityForm = this.fb.nonNullable.group({
    activityName: ['', Validators.required],
    activityType: ['', Validators.required],
    city: ['', Validators.required],
    district: [''],
    logo: [null],
  });

  ngOnInit() {
    const data = this.store.getData();

    if (data) {
      this.activityForm.patchValue({
        activityName: data.businessNameAr,
        activityType: data.businessType,
        city: data.city,
        district: data.district,
        logo: data.logo,
      });
    }
  }

  submitted = signal(false);

  formStatus = toSignal(this.activityForm.statusChanges, {
    initialValue: this.activityForm.status,
  });

  isFormInvalid = computed(() => this.formStatus() === 'INVALID');

  hasError(controlName: string, errorName: string) {
    const c = this.activityForm.get(controlName);
    return c?.hasError(errorName) && (c?.touched || this.submitted());
  }

  //handle file changes
  onFileSelect(event: Event, controlName: string) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.activityForm.get(controlName)?.setValue(file);
  }

  hasFile(controlName: string): boolean {
    return !!this.activityForm.get(controlName)?.value;
  }

  getFileName(controlName: string): string | null {
    const file = this.activityForm.get(controlName)?.value as File | null;
    return file ? file.name : null;
  }

  submit() {
    this.submitted.set(true);
    if (this.activityForm.invalid) return;

    this.store.setStepData({
      businessNameAr: this.activityForm.value.activityName,
      businessType: this.activityForm.value.activityType,
      city: this.activityForm.value.city,
      district: this.activityForm.value.district,
      logo: this.activityForm.value.logo,
    });

    this.router.navigate(['/auth/register/supplier/files']);
  }
  //navigate back
  goBack() {
    this.router.navigate(['/auth/register/supplier/info']);
  }
}
