import { Component, computed, inject, OnInit } from '@angular/core';
import {
  LucideAngularModule,
  MapPin,
  Search,
  Bell,
  Heart,
  ChevronDown,
  Menu,
  X,
} from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
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
  readonly X = X;

  private authservice = inject(AuthService);
  private userService = inject(UserService);

  isloggedIn = computed(() => this.authservice.isloggedIn());
  userInfo = computed(() => this.authservice.userInfo());

  isMenuOpen = false;

  // ngOnInit(): void {
  // }
}
