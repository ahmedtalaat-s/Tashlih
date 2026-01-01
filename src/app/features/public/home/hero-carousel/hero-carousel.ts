import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-hero-carousel',
  imports: [CarouselModule, ButtonModule],
  templateUrl: './hero-carousel.html',
  styleUrl: './hero-carousel.css',
})
export class HeroCarousel {
  slides = [
    {
      title: 'قطع غيار سيارتك...\nأسهل وأسرع',
      desc: 'ابحث عن قطع الغيار المستعملة، وتواصل مباشرة مع التشاليح المعتمدة في مكان واحد.',
    },
    {
      title: 'افحص، قارن، واشترِ\nبكل سهولة',
      desc: 'أكبر تجمع لموردي قطع الغيار والتشاليح في المملكة بين يديك.',
    },
    {
      title: 'التشاليح المعتمدة\nفي مكان واحد',
      desc: 'تجربة ذكية للوصول السريع لأفضل قطع الغيار.',
    },
  ];
}
