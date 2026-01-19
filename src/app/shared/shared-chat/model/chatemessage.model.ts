export type MessageType = 'text' | 'image' | 'order';

export interface ChatMessage {
  id: number;
  type: MessageType;
  senderRole: 'customer' | 'supplier' | 'system';
  text?: string;
  imageUrl?: string;

  // Order payload
  order?: {
    partName: string;
    partPrice: number;
    totalPrice: number;
  };

  time: string;
}
