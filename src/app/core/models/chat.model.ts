export type SenderType = 'customer' | 'supplier';

export type MessageType = 'text' | 'image' | 'video' | 'voice';

export type FileType = 'image' | 'video' | 'voice';

export interface ChatAttachment {
  fileType: FileType;
  fileUrl: string;
  duration?: number | null;
}

export interface ChatPart {
  id: number;
  nameAr: string;
  price: number;
  imageUrl: string;
}

export interface ChatThread {
  id: number;
  customerId: number;
  customerName: string;
  supplierId: number;
  supplierName: string;
  part?: ChatPart | null;
}

export interface ChatMessage {
  id: number;
  senderType: SenderType;
  messageType: MessageType;
  content: string | null;
  attachments: ChatAttachment[];
  createdAt: string;
}

// ─── Thread Detail (messages + metadata) ─────────────────────────────────────

export interface ChatThreadDetail {
  thread: ChatThread;
  messages: ChatMessage[];
}

export interface StartChatRequest {
  SupplierId: number;
  PartId?: number | null;
  Content: string;
}
export interface SendMessageRequest {
  PartId?: number | null;
  Content: string;
  Images?: File[];
  Videos?: File[];
  Voice?: File;
}

export interface SendTextMessageRequest {
  messageType: 'text';
  content: string;
}

export interface SendMediaMessageRequest {
  messageType: 'image' | 'video' | 'voice';
  content?: string | null;
  files: File[];
}

export interface MarkAsReadRequest {
  threadId: number;
}

export interface ChatThreadListItem {
  id: number;
  customerId: number;
  supplierId: number;
  supplierName: string;
  customerName: string;
  partId?: number | null;
  lastMessage: string | null;
  unreadCount?: number;
  updatedAt?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string | null;
  messageAr?: string | null;
  data?: T;
}

export interface StartChatResponse extends ApiResponse<ChatThread> {}

export interface MyThreadsResponse extends ApiResponse<ChatThreadListItem[]> {}

export interface GetChatMessagesResponse extends ApiResponse<ChatThreadDetail> {}

export interface SendMessageResponse extends ApiResponse<ChatMessage> {}

export interface MarkAsReadResponse extends ApiResponse<any> {}

export interface ChatMessageVM extends ChatMessage {
  isMine: boolean;
  firstAttachment?: ChatAttachment;
}

export interface ChatThreadVM extends ChatThreadListItem {
  displayName: string;
  lastMessagePreview: string;
}
