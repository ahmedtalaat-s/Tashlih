import { Component, inject } from '@angular/core';
import { SharedChat } from '../../../shared/shared-chat/shared-chat';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from '../../../shared/shared-chat/model/chatemessage.model';

@Component({
  selector: 'app-chat',
  imports: [SharedChat],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  supplierId!: string;

  messages: ChatMessage[] = [];

  supplier = {
    name: '',
    phone: '',
    location: '',
  };

  partInfo = {
    name: '',
    price: '',
    total: '',
  };
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.supplierId = this.route.snapshot.paramMap.get('supplierId')!;

    this.loadSupplierData();
    this.loadChatMessages();
  }

  loadSupplierData() {
    // 🔥 API CALL
    this.supplier = {
      name: 'مركز البركة',
      phone: '01123456789',
      location: 'حي الفجر، الرياض',
    };

    this.partInfo = {
      name: 'فرامل أمامية',
      price: '1250',
      total: '1250',
    };
  }

  loadChatMessages() {
    this.messages = [
      {
        id: Date.now(),
        type: 'order',
        senderRole: 'customer',
        time: '06:10 مساءً',
        order: {
          partName: 'فرامل أمامية',
          partPrice: 1250,
          totalPrice: 1250,
        },
      },
      {
        id: 1,
        type: 'text',
        text: 'ممكن أعرف حالة القطعة؟',
        senderRole: 'customer',
        time: '05:54 مساءً',
      },
      {
        id: 2,
        type: 'text',
        text: 'القطعة أصلية وحالتها ممتازة',
        senderRole: 'supplier',
        time: '05:55 مساءً',
      },
      {
        id: 3,
        type: 'text',
        text: 'هل السعر شامل التركيب ولا بدون؟',
        senderRole: 'customer',
        time: '05:56 مساءً',
      },
      {
        id: 4,
        type: 'text',
        text: 'السعر بدون تركيب، والتركيب متوفر برسوم إضافية',
        senderRole: 'supplier',
        time: '05:57 مساءً',
      },
    ];
  }

  sendMessage(text: string) {
    this.messages = [
      ...this.messages,
      {
        id: Date.now(),
        text,
        senderRole: 'customer',
        type: 'text',
        time: 'الآن',
      },
    ];

    // 🚀 هنا SignalR / API
  }
}
