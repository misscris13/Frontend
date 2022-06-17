// IMPORTS
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Author } from './model/Author';
import { AuthorPage } from './model/AuthorPage';
// import { AUTHOR_DATA } from './model/mock-authors';
// import { AUTHOR_DATA_LIST } from './model/mock-authors-list';

@Injectable({
    providedIn: 'root'
})
// CLASS DEFINITION
export class AuthorService {

    constructor(
        private http: HttpClient
    ) { }

    // GET Petition
    getAuthors(pageable: Pageable): Observable<AuthorPage> {
        return this.http.post<AuthorPage>('http://localhost:8080/author', {pageable: pageable});
    }

    // PUT Petition
    saveAuthor(author: Author): Observable<void> {
        let url = 'http://localhost:8080/author';
        
        if (author.id != null)  // check if editing or creating
            url += '/' + author.id;
        
        return this.http.put<void>(url, author);
    }

    // DELETE Petition
    deleteAuthor(idAuthor: number): Observable<void> {
        return this.http.delete<void>('http://localhols:8080/author/' + idAuthor);
    }

    // GET Petition but without pages
    getAllAuthors(): Observable<Author[]> {
        return this.http.get<Author[]>('http://localhost:8080/author');
    }
}
