import { Component } from '@angular/core';
import { LucideAngularModule, MapPin, Facebook, Twitter, Instagram } from 'lucide-angular';
@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly MapPin = MapPin;
  readonly Facebook = Facebook;
  readonly Twitter = Twitter;
  readonly Instagram = Instagram;
}
