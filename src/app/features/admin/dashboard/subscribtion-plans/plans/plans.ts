import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Plan } from '../../../../../core/models/admin.model';
import { PlanCard } from './plan-card/plan-card';
import { SubscribtionPlansService } from '../../../../../core/services/admin/subscribtion.plans.service';
import { isPlatformBrowser } from '@angular/common';
import { AddPlan } from './add-plan/add-plan';
import { DeletePlan } from './delete-plan/delete-plan';

@Component({
  selector: 'app-plans',
  imports: [PlanCard, AddPlan, DeletePlan],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans {
  private planService = inject(SubscribtionPlansService);
  private platform = inject(PLATFORM_ID);

  plans: Plan[] = [];
  openAddModalBool: boolean = false;
  openEditModalBool: boolean = false;
  openDeleteModalBool: boolean = false;

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
          console.log(this.plans);
        }
      },
    });
  }
  // helpers for openning modals
  toggleAddModal() {
    this.openAddModalBool = !this.openAddModalBool;
  }
  toggleEditModal() {
    this.openEditModalBool = !this.openEditModalBool;
  }
  toggledeleteModal() {
    this.openDeleteModalBool = !this.openDeleteModalBool;
  }
  // delete a plan
  selectedDeletePlan!: Plan;
  deletePlan(plan: Plan) {
    this.selectedDeletePlan = plan;
    this.toggledeleteModal();
  }
  confirmDelete() {
    this.planService.deletePlan(this.selectedDeletePlan.id).subscribe({
      next: () => {
        this.toggledeleteModal();
        this.loadPlans();
      },
    });
  }
  // edit a plan
  selectedEditPlan!: Plan;
  editPlan(plan: Plan) {
    this.selectedEditPlan = plan;
    this.toggleEditModal();
  }
}
