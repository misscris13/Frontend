// IMPORTS
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Lease } from './model/Lease';
import { LeasePage } from './model/LeasePage';
import { LEASE_DATA } from './model/mock-leases';


@Injectable({
    providedIn: 'root'
})
// CLASS DEFINITION
export class LeaseService {

    constructor() { }

    // Gets leases, paged
    getLeases(pageable: Pageable): Observable<LeasePage> {
        return of(LEASE_DATA);
    }

    // Saves a lease
    saveLease(lease: Lease): Observable<void> {
        return of(null);
    }

    // Deletes a lease
    deleteLease(idLease: number): Observable<void> {
        return of(null);
    }
}
