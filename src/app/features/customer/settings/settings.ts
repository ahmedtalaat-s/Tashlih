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

  isSidebarOpen = false; // Mobile drawer toggle

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
