import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Plan } from '../../../../../core/models/admin.model';
import { PlanCard } from './plan-card/plan-card';
import { SubscribtionPlansService } from '../../../../../core/services/admin/subscribtion.plans.service';
import { isPlatformBrowser } from '@angular/common';
import { AddPlan } from './add-plan/add-plan';

@Component({
  selector: 'app-plans',
  imports: [PlanCard, AddPlan],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans {
  private planService = inject(SubscribtionPlansService);
  private platform = inject(PLATFORM_ID);

  plans: Plan[] = [];
  openAddModalBool: boolean = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.loadPlans();
    }
  }

  // load the subscribtion plans
  loadPlans() {
    this.planService.getPlans().subscribe({
      next: (res) => {
        if (res.success) {
          this.plans = res.plans;
        }
      },
    });
  }

  toggleAddModal() {
    this.openAddModalBool = !this.openAddModalBool;
  }
}
