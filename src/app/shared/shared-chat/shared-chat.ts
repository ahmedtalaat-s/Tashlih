import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  LucideAngularModule,
  Phone,
  MapPin,
  ImagePlus as ImageIcon,
  Send,
  Pen,
} from 'lucide-angular';
import { ChatMessage } from './model/chatemessage.model';
import { FormsModule } from '@angular/forms';
import { SaudiRiyalPipe } from '../../core/pipes/saudi-riyal-pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-chat',
  imports: [LucideAngularModule, FormsModule, SaudiRiyalPipe, CommonModule],
  templateUrl: './shared-chat.html',
  styleUrl: './shared-chat.css',
})
export class SharedChat {
  readonly phoneIcon = Phone;
  readonly mapIcon = MapPin;
  readonly imageIcon = ImageIcon;
  readonly sendIcon = Send;
  readonly pen = Pen;

  @Input({ required: true }) currentUserRole!: 'customer' | 'supplier';

  @Input() supplierName = '';
  @Input() supplierPhone = '';
  @Input() supplierLocation = '';

  @Input() partName = '';
  @Input() partPrice = '';
  @Input() totalPrice = '';

  // Messages
  @Input() messages: ChatMessage[] = [];

  // Output
  @Output() sendMessage = new EventEmitter<string>();

  messageText = '';

  onSend() {
    if (!this.messageText.trim()) return;
    this.sendMessage.emit(this.messageText);
    this.messageText = '';
  }

  isSent(message: ChatMessage): boolean {
    return message.senderType === this.currentUserRole;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) {
      return 'الآن';
    } else if (diffInMinutes < 60) {
      return `قبل ${diffInMinutes} دقيقة`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `قبل ${hours} ساعة`;
    } else {
      return date.toLocaleDateString('ar-SA');
    }
  }
}
