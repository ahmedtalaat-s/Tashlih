export type SenderType = 'customer' | 'supplier';
export type MessageType = 'text' | 'image' | 'video' | 'voice' | 'mixed';
export type FileType = 'image' | 'video' | 'voice';

export interface ChatAttachment {
  fileType: FileType;
  fileUrl: string;
  duration?: number | null; // seconds, for voice messages
}

export interface ChatMessage {
  id: number;
  senderType: SenderType;
  messageType: MessageType;
  content: string | null;
  attachments: ChatAttachment[];
  createdAt: string; // ISO date string
}
