import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  User,
  LogOut,
  Shield,
  FileText,
  Bell,
  Headset,
  ChevronLeft,
  ChevronDown,
  XIcon,
  MenuIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { CustomerProfileResponse } from '../../../core/models/customerProfile.model';
import { UserService } from '../../../core/services/user.service';
import { CustomerProfileService } from '../../../core/services/customer-profile.service';
import { finalize } from 'rxjs';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [LucideAngularModule, CommonModule, FormsModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private profileService = inject(CustomerProfileService);

  // Readonly icon properties
  readonly UserIcon = User;
  readonly XIcon = XIcon;
  readonly MenuIcon = MenuIcon;
  readonly LogoutIcon = LogOut;
  readonly ShieldIcon = Shield;
  readonly FileTextIcon = FileText;
  readonly BellIcon = Bell;
  readonly HeadsetIcon = Headset;
  readonly ChevronLeftIcon = ChevronLeft;
  readonly ChevronDownIcon = ChevronDown;

  profileForm!: FormGroup;
  isLoading = true;
  isSaving = false;
  isSidebarOpen = false; // Mobile drawer toggle
  originalData!: CustomerProfileResponse;

  user!: CustomerProfileResponse | null;

  ngOnInit(): void {
    this.getUserInfo();
    this.initForm();
  }

  getUserInfo() {
    this.userService.getuserInfo().subscribe((res) => {
      if (res) {
        this.user = res;
        this.patchFormValues(res);
      }
    });
  }

  //form
  private initForm() {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [{ value: '', disabled: true }], // Phone usually read-only
      notificationsEnabled: [true],
      preferredLanguage: ['ar'],
      // Address sub-group
      street: [''],
      cityId: [null],
      postalCode: [''],
      latitude: [0],
      longitude: [0],
    });
  }

  patchFormValues(data: CustomerProfileResponse) {
    this.profileForm.patchValue({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      notificationsEnabled: data.notificationsEnabled,
      preferredLanguage: data.preferredLanguage,
      street: data.address?.street,
      cityId: data.address?.cityId,
      postalCode: data.address?.postalCode,
      latitude: data.address?.latitude,
      longitude: data.address?.longitude,
    });
  }

  saveChanges() {
    if (this.profileForm.invalid) return;

    this.isSaving = true;
    const payload = this.profileForm.getRawValue();

    this.profileService
      .updateProfile(payload)
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe({
        next: () => {
          // Trigger success toast logic here
          this.originalData = { ...this.originalData, ...payload };
          this.profileForm.markAsPristine();
        },
      });
  }

  discardChanges() {
    this.patchFormValues(this.originalData);
    this.profileForm.markAsPristine();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
