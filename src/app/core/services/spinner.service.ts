import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private readonly _loading = signal<boolean>(false);
  private readonly _loadingCount = signal<number>(0);
  private readonly _message = signal<string>('');

  /**
   * Observable signal for loading state
   */
  readonly loading = this._loading.asReadonly();

  /**
   * Observable signal for loading message
   */
  readonly message = this._message.asReadonly();

  constructor() {
    // Update loading state based on count
    effect(() => {
      const count = this._loadingCount();
      this._loading.set(count > 0);
    });
  }

  /**
   * Show the spinner
   * @param message Optional message to display
   */
  show(message?: string): void {
    this._loadingCount.update((count) => count + 1);
    if (message) {
      this._message.set(message);
    }
  }

  /**
   * Hide the spinner
   */
  hide(): void {
    this._loadingCount.update((count) => {
      const newCount = Math.max(0, count - 1);
      if (newCount === 0) {
        this._message.set('');
      }
      return newCount;
    });
  }

  /**
   * Force hide the spinner (resets count to 0)
   */
  forceHide(): void {
    this._loadingCount.set(0);
    this._message.set('');
  }

  /**
   * Check if spinner is currently showing
   */
  isLoading(): boolean {
    return this._loading();
  }
}
