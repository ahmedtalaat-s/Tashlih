import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  User,
  Phone,
  Mail,
  Camera,
  MapPin,
  LogOut,
  Shield,
  FileText,
  Bell,
  Headset,
  ChevronLeft,
  ChevronDown,
  Pen,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-settings',
  imports: [LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  // Readonly icon properties
  readonly UserIcon = User;
  readonly PhoneIcon = Phone;
  readonly MailIcon = Mail;
  readonly CameraIcon = Camera;
  readonly MapPinIcon = MapPin;
  readonly LogoutIcon = LogOut;
  readonly ShieldIcon = Shield;
  readonly FileTextIcon = FileText;
  readonly BellIcon = Bell;
  readonly HeadsetIcon = Headset;
  readonly ChevronLeftIcon = ChevronLeft;
  readonly ChevronDownIcon = ChevronDown;
  readonly Pen = Pen;

  // User info
  userName = 'أحمد سامي علي';
  userPhone = '+11234567890';
  userEmail = 'example@mail.com';
  address = 'لا يوجد عنوان مسجل';
}
