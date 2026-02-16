import { Component, inject } from '@angular/core';
import { PlanCard } from './subscribtion-plans/plans/plan-card/plan-card';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StorageHelper } from '../../../helpers/storage.helper';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  private router = inject(Router);
  logout() {
    StorageHelper.clear();
    this.router.navigate(['/admin/login']);
  }
}
