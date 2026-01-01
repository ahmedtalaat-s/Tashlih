import { Component } from '@angular/core';
import {
  LucideAngularModule,
  MapPin,
  Search,
  Bell,
  Heart,
  ChevronDown,
  Menu,
} from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly MapPin = MapPin;
  readonly Search = Search;
  readonly Bell = Bell;
  readonly Heart = Heart;
  readonly ChevronDown = ChevronDown;
  readonly Menu = Menu;
}
