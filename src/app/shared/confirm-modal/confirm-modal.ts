import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirm-modal',
  imports: [FormsModule],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
})
export class ConfirmModal {
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  data = {
    reason: '',
    adminNotes: '',
  };
  onCancel() {
    this.cancel.emit();
  }

  onConfirm() {
    this.confirm.emit(this.data);
  }
}
