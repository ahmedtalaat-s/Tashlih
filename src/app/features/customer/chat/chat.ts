import { Component, inject, OnInit } from '@angular/core';
import { SharedChat } from '../../../shared/shared-chat/shared-chat';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatMessage } from '../../../shared/shared-chat/model/chatemessage.model';
import { ChatService } from '../../../core/services/chat.service';
import { ToastService } from '../../../core/services/toast.service';
import { PartsServices } from '../../../core/services/parts.service';
import { SupplierService } from '../../../core/services/supplier.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';
import { Supplier } from '../../../core/models/supplier.model';

@Component({
  selector: 'app-chat',
  imports: [SharedChat],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit {
  supplierId!: string;
  threadId: number | null = null;
  partId: number | null = null;

  messages: ChatMessage[] = [];
  isLoading = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private chatService = inject(ChatService);
  private toastService = inject(ToastService);
  private partService = inject(PartsServices);
  private supplierService = inject(SupplierService);

  supplierdata: any;
  partdata: any;

  firstMessage = true;

  ngOnInit() {
    this.supplierId = this.route.snapshot.paramMap.get('supplierId')!;
    this.partId = this.route.snapshot.queryParamMap.get('partId')
      ? +this.route.snapshot.queryParamMap.get('partId')!
      : null;
    if (this.partId) this.partdata = toSignal(this.partService.getPartById(this.partId));
    this.supplierdata = toSignal(this.supplierService.getSupplierById(this.supplierId));
  }

  sendMessage(text: string) {
    if (this.firstMessage) {
      this.startNewChat(text);
    } else {
      if (!text.trim() || !this.threadId) return;

      this.isLoading = true;

      this.chatService
        .sendMessage(this.threadId, {
          Content: text,
        })
        .subscribe({
          next: (response) => {
            if (response.success && response.data) {
              // Add the new message to the list
              const newMessage: ChatMessage = response.data;
              this.messages = [...this.messages, newMessage];
              this.isLoading = false;
            }
          },
          error: (err) => {
            this.isLoading = false;
            this.toastService.error('Failed to send message', 'Error');
            console.error(err);
          },
        });
    }
  }

  openThread() {
    if (!this.threadId) return;

    this.isLoading = true;
    this.messages = [];

    this.chatService.getMessages(this.threadId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          // Load thread data and messages
          // this.supplier.name = response.data.thread.supplierName;
          // this.partInfo.name = response.data.thread.part?.nameAr || '';
          // this.partInfo.price = response.data.thread.part?.price.toString() || '';

          // Load messages
          this.messages = response.data.messages as any;

          // Mark as read
          if (this.threadId) {
            this.chatService.markAsRead(this.threadId).subscribe();
          }

          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.toastService.error('Failed to load messages', 'Error');
        console.error(err);
      },
    });
  }

  startNewChat(message: string) {
    if (!this.supplierId) return;

    this.isLoading = true;

    this.chatService
      .startChat({
        SupplierId: +this.supplierId,
        PartId: this.partId || undefined,
        Content: message,
      })
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.threadId = response.data.id;
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.toastService.error('Failed to start chat', 'Error');
          console.error(err);
        },
      });
  }
}
