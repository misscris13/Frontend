// IMPORTS
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from './model/Category';

@Injectable({
    providedIn: 'root'
})
// CLASS DEFINITION
export class CategoryService {

    constructor(
        private http: HttpClient
    ) { }

    // Getter
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>('http://localhost:8080/category');
    }

    // Setter
    saveCategory(category: Category): Observable<Category> {
        let url = 'http://localhost:8080/category';
        if (category.id != null)
            url += '/' + category.id;
        
        return this.http.put<Category>(url, category);
    }

    // Delete
    deleteCategory(idCategory: number): Observable<any> {
        return this.http.delete('http://localhost:8080/category/' + idCategory);
    }
}