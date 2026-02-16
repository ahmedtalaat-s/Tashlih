import { Component, Output, EventEmitter, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Plan, PlanRequest } from '../../../../../../core/models/admin.model';
import { SubscribtionPlansService } from '../../../../../../core/services/admin/subscribtion.plans.service';

@Component({
  selector: 'app-add-plan',
  imports: [ReactiveFormsModule],
  templateUrl: './add-plan.html',
  styleUrl: './add-plan.css',
})
export class AddPlan {
  @Input() plan: Plan | null = null;
  @Input() mode: 'add' | 'edit' = 'add';

  @Output() close = new EventEmitter<void>();
  @Output() added = new EventEmitter<void>();

  planForm!: FormGroup;
  selectedFile!: File | null;
  imagePreview: string | null = null;

  private fb = inject(FormBuilder);
  private planService = inject(SubscribtionPlansService);

  ngOnInit(): void {
    this.initForm();

    if (this.mode === 'edit' && this.plan) {
      this.patchForm();
    }
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

    if (this.mode == 'add') {
      this.addPlan(planRequest);
    } else {
      this.editPlan(planRequest);
    }
  }

  addPlan(planRequest: PlanRequest) {
    this.planService.createPlan(planRequest).subscribe({
      next: () => {
        this.planForm.reset();
        this.removeImage();
        this.added.emit();
        this.close.emit();
      },
    });
  }
  editPlan(planRequest: PlanRequest) {
    this.planService.updatePlan(this.plan?.id ?? 0, planRequest).subscribe({
      next: () => {
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

  // patch the from for edit
  patchForm() {
    this.planForm.patchValue({
      NameAr: this.plan?.nameAr,
      NameEn: this.plan?.nameEn,
      DescriptionAr: this.plan?.descriptionAr,
      DescriptionEn: this.plan?.descriptionEn,
      Price: this.plan?.price,
      Currency: this.plan?.currency,
      DurationDays: this.plan?.durationDays,
      MaxParts: this.plan?.maxParts,
      MaxImagesPerPart: this.plan?.maxImagesPerPart,
      MaxShops: this.plan?.maxShops,
      BadgeText: this.plan?.badgeText,
      SortOrder: 0,
      IsActive: true,
      IsPopular: this.plan?.isPopular,
    });

    // عرض الصورة القديمة
    if (this.plan?.logoUrl) {
      this.imagePreview = this.plan?.logoUrl;
    }
  }
}
