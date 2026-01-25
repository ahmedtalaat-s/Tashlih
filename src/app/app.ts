import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LanguageService } from './core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Spinner } from './shared/spinner/spinner';
import { SpinnerService } from './core/services/spinner.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, Spinner],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Tashlih');
  private language = inject(LanguageService);
  private translate = inject(TranslateService);
  spinnerService = inject(SpinnerService);

  constructor() {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setFallbackLang('ar');
    this.translate.use('ar');
  }

  getclass() {
    return this.language.defaultLanguage() === 'ar' ? 'rtl-toast' : '';
  }
  getPosition() {
    return this.language.defaultLanguage() === 'ar' ? 'top-left' : 'top-right';
  }
}
