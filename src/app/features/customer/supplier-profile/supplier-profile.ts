import { Component } from '@angular/core';
import {
  Heart,
  Share2,
  MapPin,
  Image as ImageIcon,
  MessageCircle,
  Phone,
  Search,
  ChevronLeft,
  LucideAngularModule,
} from 'lucide-angular';
import { IProductCard } from '../../public/product/model/produtct';
import { ProductCard } from '../../public/product/product-card/product-card';

@Component({
  selector: 'app-supplier-profile',
  imports: [LucideAngularModule, ProductCard],
  templateUrl: './supplier-profile.html',
  styleUrl: './supplier-profile.css',
})
export class SupplierProfile {
  readonly heartIcon = Heart;
  readonly shareIcon = Share2;
  readonly locationIcon = MapPin;
  readonly imageIcon = ImageIcon;
  readonly chatIcon = MessageCircle;
  readonly phoneIcon = Phone;
  readonly searchIcon = Search;
  readonly chevronLeftIcon = ChevronLeft;

  supplier = {
    name: 'تشليح الوفاء لقطع الغيار',
    location: 'حي الفجر، برج الفجر، الرياض',
    about:
      'أكثر من 10 سنوات في قطع غيار السيارات الكورية واليابانية. متخصصون في محركات وناقلات الحركة لهيونداي، تويوتا، وكيا.',
  };

  parts: IProductCard[] = Array.from({ length: 8 }).map(() => ({
    id: 2,
    title: 'قير أوتوماتيك هيونداي',
    image: 'https://placehold.co/150x100/fdfbf0/333?text=Gear',
    price: 200,
    currency: 'ر.س',
  }));
}
