// IMPORTS
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from './model/Category';
import { CATEGORY_DATA } from './model/mock-categories';

@Injectable({
  providedIn: 'root'
})
// CLASS DEFINITION
export class CategoryService {

  constructor() { }

  // Getter
  getCategories(): Observable<Category[]> {
    return of(CATEGORY_DATA);
  }

  // Setter
  saveCategory(category: Category): Observable<Category> {
    return of(null);
  }

  // Delete
  deleteCategory(idCategory: number): Observable<any> {
    return of(null);
  }
}