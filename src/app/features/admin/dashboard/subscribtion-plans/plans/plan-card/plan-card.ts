import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Plan } from '../../../../../../core/models/admin.model';
import { SaudiRiyalPipe } from '../../../../../../core/pipes/saudi-riyal-pipe';

@Component({
  selector: 'app-plan-card',
  imports: [CommonModule, SaudiRiyalPipe],
  templateUrl: './plan-card.html',
  styleUrl: './plan-card.css',
})
export class PlanCard {
  @Input() plan!: Plan;

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.plan.id);
  }
  onDelete() {
    this.delete.emit(this.plan.id);
  }
}
