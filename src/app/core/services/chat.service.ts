import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GetChatMessagesResponse,
  MyThreadsResponse,
  SendMessageResponse,
  StartChatResponse,
  SendTextMessageRequest,
  StartChatRequest,
  SendMessageRequest,
} from '../models/chat.model';
import { API_CONSTANTS } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private http = inject(HttpClient);
  private readonly baseUrl = API_CONSTANTS.BASE_URL;

  // =========================================================
  // 🟢 START CHAT
  // =========================================================
  startChat(
    data: StartChatRequest & {
      images?: File[];
      videos?: File[];
      voice?: File;
    },
  ): Observable<StartChatResponse> {
    const formData = new FormData();

    formData.append('SupplierId', String(data.SupplierId));

    if (data.PartId) {
      formData.append('PartId', String(data.PartId));
    }

    if (data.Content) {
      formData.append('Content', data.Content);
    }

    data.images?.forEach((file) => {
      formData.append('Images', file);
    });

    data.videos?.forEach((file) => {
      formData.append('Videos', file);
    });

    if (data.voice) {
      formData.append('Voice', data.voice);
    }

    return this.http.post<StartChatResponse>(
      this.baseUrl + API_CONSTANTS.END_POINTS.CHAT.START,
      formData,
    );
  }

  // =========================================================
  // 🟢 GET THREADS
  // =========================================================
  getMyThreads(): Observable<MyThreadsResponse> {
    return this.http.get<MyThreadsResponse>(
      this.baseUrl + API_CONSTANTS.END_POINTS.CHAT.MY_THREADS,
    );
  }

  // =========================================================
  // 🟢 GET MESSAGES
  // =========================================================
  getMessages(
    threadId: number,
    page: number = 1,
    pageSize: number = 20,
  ): Observable<GetChatMessagesResponse> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);

    return this.http.get<GetChatMessagesResponse>(
      this.baseUrl + API_CONSTANTS.END_POINTS.CHAT.MESSAGES(threadId),
      { params },
    );
  }

  // =========================================================
  // 🟢 SEND MESSAGE
  // =========================================================
  sendMessage(threadId: number, data: SendMessageRequest): Observable<SendMessageResponse> {
    const formData = new FormData();

    if (data.Content) {
      formData.append('Content', data.Content);
    }

    data.Images?.forEach((file: File) => {
      formData.append('Images', file);
    });

    data.Videos?.forEach((file: File) => {
      formData.append('Videos', file);
    });

    if (data.Voice) {
      formData.append('Voice', data.Voice);
    }

    return this.http.post<SendMessageResponse>(
      this.baseUrl + API_CONSTANTS.END_POINTS.CHAT.SEND(threadId),
      formData,
    );
  }

  // =========================================================
  // 🟢 MARK AS READ
  // =========================================================
  markAsRead(threadId: number): Observable<any> {
    return this.http.put(this.baseUrl + API_CONSTANTS.END_POINTS.CHAT.READ(threadId), {});
  }

  // =========================================================
  // 🔴 DELETE THREAD
  // =========================================================
  deleteThread(threadId: number): Observable<any> {
    return this.http.delete(this.baseUrl + API_CONSTANTS.END_POINTS.CHAT.DELETE(threadId));
  }
}
