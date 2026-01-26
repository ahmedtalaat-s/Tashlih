import { Component, inject, OnInit } from '@angular/core';
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
export class Categories implements OnInit {
  private partsService = inject(PartsServices);
  private languageService = inject(LanguageService);
  private router = inject(Router);
  categories!: Category[];

  ngOnInit(): void {
    this.partsService.getPartCategories().subscribe((response) => {
      this.categories = this.shuffleArray(response.data).slice(0, 27);
    });
  }

  getCategoryName(category: Category): string {
    const lang = this.languageService.defaultLanguage();
    return lang === 'ar' ? category.nameAr : category.nameEn;
  }
  shuffleArray<T>(array: T[]): T[] {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  openSearchpage(categoryId: number) {
    this.router.navigate(['/customer/search'], { queryParams: { categoryId } });
  }
}
