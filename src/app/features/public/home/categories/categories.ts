import { Component, inject, Input, OnInit } from '@angular/core';
import { Category } from '../../../../core/models/categories.model';
import { PartsServices } from '../../../../core/services/parts.service';
import { LanguageService } from '../../../../core/services/language.service';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  private languageService = inject(LanguageService);
  private router = inject(Router);
  @Input() categories!: Category[];

  getCategoryName(category: Category): string {
    const lang = this.languageService.defaultLanguage();
    return lang === 'ar' ? category.nameAr : category.nameEn;
  }

  openSearchpage(subcategoryId: number, subcategoryName: string) {
    this.router.navigate(['/customer/search'], { queryParams: { subcategoryId, subcategoryName } });
  }
}
