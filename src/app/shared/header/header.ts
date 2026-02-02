import { Component, computed, inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  LucideAngularModule,
  MapPin,
  Search,
  Bell,
  Heart,
  ChevronDown,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
} from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PartsServices } from '../../core/services/parts.service';
import { Category } from '../../core/models/categories.model';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive, FormsModule],
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
  readonly ChevronRight = ChevronRight;
  readonly ChevronLeft = ChevronLeft;

  private authservice = inject(AuthService);
  private userService = inject(UserService);
  private partsService = inject(PartsServices);
  private platform = inject(PLATFORM_ID);
  private router = inject(Router);

  categories!: Category[];

  isloggedIn = computed(() => this.authservice.isloggedIn());
  userInfo = computed(() => this.authservice.userInfo());

  isMenuOpen = false;
  searchKey!: string;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.loadCategories();
    }
  }

  loadCategories() {
    this.partsService.getPartCategories(true).subscribe((response) => {
      this.categories = response.data;
    });
  }

  navigateToSearch(id: any, name: string) {
    this.router.navigate(['/customer/search'], {
      queryParams: { subcategoryId: id, subcategoryName: name },
    });
  }
  SearchByKeyword() {
    this.router.navigate(['/customer/search'], {
      queryParams: { search: this.searchKey },
    });
  }
}
