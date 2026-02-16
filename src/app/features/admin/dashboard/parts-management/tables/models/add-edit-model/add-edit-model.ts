import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminLookupsService } from '../../../../../../../core/services/admin/admin.lookups.service';
import { VehicleModel, Make } from '../../../../../../../core/models/lookups.model';
@Component({
  selector: 'app-add-edit-model',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-model.html',
  styleUrl: './add-edit-model.css',
})
export class AddEditModel {
  @Input() model: VehicleModel | null = null;
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() makes: Make[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() submitModel = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private adminService = inject(AdminLookupsService);

  modelForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();

    if (this.mode === 'edit' && this.model) {
      this.patchForm();
    }
  }

  initForm() {
    this.modelForm = this.fb.group({
      nameAr: ['', [Validators.required, Validators.minLength(2)]],
      nameEn: ['', [Validators.required, Validators.minLength(2)]],
      makeId: ['', Validators.required],
    });
  }

  patchForm() {
    this.modelForm.patchValue({
      nameAr: this.model?.nameAr,
      nameEn: this.model?.nameEn,
      makeId: this.model?.makeId,
    });
  }

  get f() {
    return this.modelForm.controls;
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.modelForm.invalid) {
      this.modelForm.markAllAsTouched();
      return;
    }

    const payload = this.modelForm.value;

    if (this.mode === 'add') {
      this.addModel(payload);
    } else {
      this.editModel(payload);
    }
  }

  addModel(data: VehicleModel) {
    this.adminService.createModel(data).subscribe({
      next: () => this.reset(),
    });
  }

  editModel(data: VehicleModel) {
    if (!this.model) return;

    this.adminService.updateModel(this.model.id, data).subscribe({
      next: () => this.reset(),
    });
  }

  reset() {
    this.modelForm.reset();
    this.submitModel.emit();
    this.close.emit();
  }
}
