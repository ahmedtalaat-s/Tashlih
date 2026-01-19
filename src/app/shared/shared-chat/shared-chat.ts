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

@Component({
  selector: 'app-shared-chat',
  imports: [LucideAngularModule, FormsModule, SaudiRiyalPipe],
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
    return message.senderRole === this.currentUserRole;
  }
}
