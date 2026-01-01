import { Component } from '@angular/core';
import { LucideAngularModule, Phone, Mail, MapPin } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly Phone = Phone;
  readonly Mail = Mail;
  readonly MapPin = MapPin;
}
