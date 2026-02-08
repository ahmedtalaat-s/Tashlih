import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { User, Phone, Mail, Camera, MapPin, Pen, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  userName = 'أحمد سامي علي';
  userPhone = '+11234567890';
  userEmail = 'example@mail.com';
  address = 'لا يوجد عنوان مسجل';

  readonly UserIcon = User;
  readonly Pen = Pen;
  readonly PhoneIcon = Phone;
  readonly MailIcon = Mail;
  readonly MapPinIcon = MapPin;
  readonly CameraIcon = Camera;
}
