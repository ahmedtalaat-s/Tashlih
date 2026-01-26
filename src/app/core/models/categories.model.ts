export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  messageAr: string | null;
  data: T;
  count: number;
}

export interface Category {
  id: number;
  parentId: number | null;
  parentNameAr: string | null;

  nameAr: string;
  nameEn: string;

  icon: string;
  sortOrder: number;
  level: number;

  children: Category[] | null;
}

export interface CategoriesResponse extends ApiResponse<Category[]> {}
