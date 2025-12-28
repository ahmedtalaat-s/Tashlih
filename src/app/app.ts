import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Tashlih');
  private language = inject(LanguageService);

  getclass() {
    return this.language.defaultLanguage() === 'ar' ? 'rtl-toast' : '';
  }
  getPosition() {
    return this.language.defaultLanguage() === 'ar' ? 'top-left' : 'top-right';
  }
}
