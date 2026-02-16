import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../../../../core/models/lookups.model';
import { AdminLookupsService } from '../../../../../../../core/services/admin/admin.lookups.service';

@Component({
  selector: 'app-add-edit-category',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-category.html',
  styleUrl: './add-edit-category.css',
})
export class AddEditCategory {
  @Input() category: Category | null = null;
  @Input() mode: 'add' | 'edit' = 'add';

  @Output() close = new EventEmitter<void>();
  @Output() submitCategory = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private adminService = inject(AdminLookupsService);

  categoryForm!: FormGroup;
  imagePreview: string | null = null;
  selectedFile: File | null = null;

  ngOnInit(): void {
    this.initForm();

    if (this.mode === 'edit' && this.category) {
      this.patchForm();
    }
  }

  initForm() {
    this.categoryForm = this.fb.group({
      NameAr: ['', [Validators.required, Validators.minLength(2)]],
      NameEn: ['', [Validators.required, Validators.minLength(2)]],
      Icon: [null],
    });
  }

  patchForm() {
    this.categoryForm.patchValue({
      NameAr: this.category?.nameAr,
      NameEn: this.category?.nameEn,
    });

    if (this.category?.icon) {
      this.imagePreview = this.category?.icon;
    }
  }
  get f() {
    return this.categoryForm.controls;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files.length) return;

    const file = input.files[0];

    if (file.size > 2 * 1024 * 1024) {
      alert('حجم الصورة يجب ألا يتجاوز 2MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('يجب اختيار صورة صحيحة');
      return;
    }

    this.selectedFile = file;
    this.categoryForm.patchValue({ Icon: file });

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeImage(event?: Event) {
    if (event) event.stopPropagation();
    this.imagePreview = null;
    this.selectedFile = null;
    this.categoryForm.patchValue({ Icon: null });
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('NameAr', this.categoryForm.value.NameAr);
    formData.append('NameEn', this.categoryForm.value.NameEn);

    if (this.selectedFile) {
      formData.append('Icon', this.selectedFile);
    }

    if (this.mode == 'add') {
      this.addCategory(formData);
    } else {
      this.editCategory(formData);
    }
  }

  addCategory(form: FormData) {
    this.adminService.createCategory(form).subscribe({
      next: () => {
        this.reset();
      },
    });
  }
  editCategory(form: FormData) {
    if (this.category)
      this.adminService.updateCategory(this.category?.id, form).subscribe({
        next: () => {
          this.reset();
        },
      });
  }

  reset() {
    this.categoryForm.reset();
    this.removeImage();
    this.submitCategory.emit();
    this.close.emit();
  }
}
