import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  User,
  Phone,
  Mail,
  Camera,
  MapPin,
  Pen,
  TrashIcon,
  LucideAngularModule,
} from 'lucide-angular';
import {
  CustomerProfileResponse,
  UpdateCustomerProfileRequest,
} from '../../../../core/models/customerProfile.model';
import { CustomerProfileService } from '../../../../core/services/customer-profile.service';
import { UserService } from '../../../../core/services/user.service';
import { City } from '../../../../core/models/lookups.model';
import { AuthService } from '../../../../core/services/auth.service';
import { StorageHelper } from '../../../../helpers/storage.helper';
import { APP_CONSTANTS } from '../../../../constants/app.constants';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  readonly UserIcon = User;
  readonly Pen = Pen;
  readonly PhoneIcon = Phone;
  readonly MailIcon = Mail;
  readonly MapPinIcon = MapPin;
  readonly CameraIcon = Camera;
  readonly TrashIcon = TrashIcon;
  private userService = inject(UserService);
  private profileService = inject(CustomerProfileService);
  private authService = inject(AuthService);

  user!: CustomerProfileResponse | null;
  cities!: City[];
  /** form used for update */
  form: UpdateCustomerProfileRequest = {
    fullName: '',
    email: '',
    preferredLanguage: '',
    notificationsEnabled: false,
    street: '',
    cityId: 0,
    postalCode: '',
  };
  /** edit state */
  editingField: 'fullName' | 'email' | null = null;
  originalValues: any = {};

  /** address */
  editingAddress = false;
  addressExists = false;
  addressText = '';

  addressForm = {
    street: '',
    cityId: 0,
    postalCode: '',
  };
  passwordForm = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  ngOnInit(): void {
    this.getUserInfo();
    this.getCities();
  }

  getUserInfo() {
    this.userService.getuserInfo().subscribe((res) => {
      if (res) {
        this.user = res;
        this.form.fullName = res.fullName;
        this.form.email = res.email;
        this.form.preferredLanguage = res.preferredLanguage;
        this.form.notificationsEnabled = res.notificationsEnabled;
        if (res.address.street) {
          this.addressExists = true;
          this.addressText = `${res.address.street} - ${res.address.cityNameAr}`;
          this.addressForm.street = res.address.street!;
          this.addressForm.cityId = res.address.cityId!;
          this.addressForm.postalCode = res.address.postalCode!;
        }
      }
    });
  }
  getCities() {
    this.profileService.getCities().subscribe((res) => {
      this.cities = res;
    });
  }

  /** ========= Field Editing ========= */
  enableEdit(field: 'fullName' | 'email') {
    this.editingField = field;
    this.originalValues[field] = this.form[field];
  }

  cancelEdit() {
    if (this.editingField) {
      this.form[this.editingField] = this.originalValues[this.editingField];
    }
    this.editingField = null;
  }

  saveField() {
    this.profileService.updateProfile(this.form).subscribe(() => {
      this.editingField = null;
    });
  }

  /** ========= Address ========= */
  editAddress() {
    this.editingAddress = true;
  }

  cancelAddress() {
    this.editingAddress = false;
  }

  saveAddress() {
    this.form.street = this.addressForm.street;
    this.form.cityId = this.addressForm.cityId;
    this.form.postalCode = this.addressForm.postalCode;

    this.profileService.updateProfile(this.form).subscribe(() => {
      const cityAr = this.cities.filter((c) => c.id == this.addressForm.cityId)[0].nameAr;
      const cityEn = this.cities.filter((c) => c.id == this.addressForm.cityId)[0].nameEn;
      if (this.user) {
        this.user.address.street = this.addressForm.street;
        this.user.address.cityId = this.addressForm.cityId;
        this.user.address.postalCode = this.addressForm.postalCode;
        this.user.address.cityNameAr = cityAr;
        this.user.address.cityNameEn = cityEn;

        StorageHelper.setItem(APP_CONSTANTS.STORAGE_KEYS.USER_INFO, this.user);
      }
      this.editingAddress = false;
      this.addressExists = true;
      this.addressText = `${this.addressForm.street}-${cityAr}`;
    });
  }

  //password handler
  get passwordMismatch(): boolean {
    return this.passwordForm.newPassword !== this.passwordForm.confirmPassword;
  }

  get canChangePassword(): boolean {
    return (
      !!this.passwordForm.oldPassword && !!this.passwordForm.newPassword && !this.passwordMismatch
    );
  }

  changePassword() {
    this.authService
      .changePassword(this.passwordForm.oldPassword, this.passwordForm.newPassword)
      .subscribe(() => {
        this.passwordForm = {
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        };
      });
  }

  //image upload handler
  removeAvatar() {
    this.profileService.deleteProfileImage().subscribe({
      next: (res) => {
        if (this.user) {
          this.user.avatarUrl = null;
          StorageHelper.setItem(APP_CONSTANTS.STORAGE_KEYS.USER_INFO, this.user);
        }
      },
    });
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.profileService.uploadProfileImage(file).subscribe({
      next: (res) => {
        // preview locally
        const reader = new FileReader();
        reader.onload = () => {
          if (this.user) {
            this.user.avatarUrl = reader.result as string;
            StorageHelper.setItem(APP_CONSTANTS.STORAGE_KEYS.USER_INFO, this.user);
          }
        };
        reader.readAsDataURL(file);
      },
    });
  }
}
