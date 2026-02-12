import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlanRequest } from '../../../../../../core/models/admin.model';
import { SubscribtionPlansService } from '../../../../../../core/services/admin/subscribtion.plans.service';

@Component({
  selector: 'app-add-plan',
  imports: [ReactiveFormsModule],
  templateUrl: './add-plan.html',
  styleUrl: './add-plan.css',
})
export class AddPlan {
  @Output() close = new EventEmitter<void>();
  @Output() added = new EventEmitter<void>();

  planForm!: FormGroup;
  selectedFile!: File | null;
  imagePreview: string | null = null;

  private fb = inject(FormBuilder);
  private planService = inject(SubscribtionPlansService);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.planForm = this.fb.group({
      NameAr: ['', [Validators.required, Validators.minLength(3)]],
      NameEn: [''],

      DescriptionAr: [''],
      DescriptionEn: [''],

      Price: [0, [Validators.required, Validators.min(0)]],
      Currency: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}$/)]],

      DurationDays: [30, [Validators.required, Validators.min(1)]],
      MaxParts: [1, [Validators.min(1)]],

      MaxImagesPerPart: [1, [Validators.required, Validators.min(1)]],
      MaxShops: [{ value: 1, disabled: true }, [Validators.required, Validators.min(1)]],

      BadgeText: [''],
      SortOrder: [0, [Validators.required, Validators.min(0)]],

      IsActive: [true],
      IsPopular: [false],

      logo: [null],
    });
  }

  get f() {
    return this.planForm.controls;
  }

  onClose() {
    this.close.emit();
  }
  onSubmit() {
    if (this.planForm.invalid) {
      this.planForm.markAllAsTouched();
      return;
    }

    const planRequest: PlanRequest = this.planForm.value;
    planRequest.MaxShops = 1;
    console.log(planRequest);

    this.planService.createPlan(planRequest).subscribe({
      next: (res) => {
        console.log(res);
        this.planForm.reset();
        this.removeImage();
        this.added.emit();
        this.close.emit();
      },
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('حجم الصورة يجب أن يكون أقل من 2MB');
      return;
    }
    if (!file.type.includes('image')) {
      alert('يجب اختيار صورة صحيحة');
      return;
    }

    this.selectedFile = file;
    this.planForm.patchValue({ logo: file });

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
  removeImage(event?: Event) {
    if (event) {
      event.stopPropagation(); // عشان ميضغطش upload تاني
    }
    this.imagePreview = null;
    this.selectedFile = null;
  }
}
