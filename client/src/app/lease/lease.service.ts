// IMPORTS
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Lease } from './model/Lease';
import { LeasePage } from './model/LeasePage';
// import { LEASE_DATA } from './model/mock-leases';


@Injectable({
    providedIn: 'root'
})
// CLASS DEFINITION
export class LeaseService {

    constructor(
        private http: HttpClient
    ) { }

    // Gets leases, paged
    getLeases(pageable: Pageable): Observable<LeasePage> {
        return this.http.post<LeasePage>('http://localhost:8080/lease', {pageable:pageable});
    }

    // Saves a lease
    saveLease(lease: Lease): Observable<void> {
        let url = "http://localhost:8080/lease";
        
        if (lease.id != null)
            url += "/" + lease.id;

        return this.http.put<void>(url, lease);
    }

    // Deletes a lease
    deleteLease(idLease: number): Observable<void> {
        return of(null);
    }
}
