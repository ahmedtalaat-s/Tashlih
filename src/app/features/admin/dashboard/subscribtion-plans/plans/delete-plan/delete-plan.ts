import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-plan',
  imports: [],
  templateUrl: './delete-plan.html',
  styleUrl: './delete-plan.css',
})
export class DeletePlan {
  @Input() planName!: string;

  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  onCancel() {
    this.cancel.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }
}
