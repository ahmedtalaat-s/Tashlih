import { Component, Input } from '@angular/core';
import { LucideAngularModule, Image } from 'lucide-angular';

@Component({
  selector: 'app-banner',
  imports: [LucideAngularModule],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {
  readonly Image = Image;
  @Input() title!: string;
  @Input() description!: string;

  // image OR icon (optional – flexible)
  @Input() imageSrc?: string;
  @Input() bgColor = '#0d3b66'; // default blue
}
