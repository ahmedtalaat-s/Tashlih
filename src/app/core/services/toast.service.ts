import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export type NotificationSeverity = 'success' | 'info' | 'warn' | 'error';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageService = inject(MessageService);

  show(severity: NotificationSeverity, summary: string, detail: string, life: number = 3000): void {
    this.messageService.add({
      severity,
      summary,
      detail,
      life,
    });
  }

  success(summary: string, detail: string): void {
    this.show('success', summary, detail);
  }

  error(summary: string, detail: string): void {
    this.show('error', summary, detail);
  }

  info(summary: string, detail: string): void {
    this.show('info', summary, detail);
  }

  warning(summary: string, detail: string): void {
    this.show('warn', summary, detail);
  }

  clear(): void {
    this.messageService.clear();
  }
}
