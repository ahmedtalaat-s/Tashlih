import { Component } from '@angular/core';
import {
  LucideAngularModule,
  Heart,
  Share2,
  Image,
  Calendar,
  FileText,
  Wrench,
  Box,
  MessageCircle,
  Phone,
  ChevronLeft,
} from 'lucide-angular';

@Component({
  selector: 'app-product-details',
  imports: [LucideAngularModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  readonly HeartIcon = Heart;
  readonly ShareIcon = Share2;
  readonly ImageIcon = Image;
  readonly CalendarIcon = Calendar;
  readonly FileTextIcon = FileText;
  readonly WrenchIcon = Wrench;
  readonly BoxIcon = Box;
  readonly ChatIcon = MessageCircle;
  readonly PhoneIcon = Phone;
  readonly ChevronLeftIcon = ChevronLeft;

  thumbnails = [1, 2, 3, 4, 5];
  relatedProducts = [1, 2, 3, 4, 5];
}
