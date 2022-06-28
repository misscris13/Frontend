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

    getFilteredLeases(pageable: Pageable, gameId?: number, clientId?: number, date?: Date): Observable<LeasePage> {
        return this.http.post<LeasePage>(this.composeFindUrl(gameId, clientId, date), {pageable:pageable});
    }

    getAll(): Observable<Lease[]> {
        return this.http.get<Lease[]>('http://localhost:8080/lease');
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
        return this.http.delete<void>("http://localhost:8080/lease/" + idLease);
    }

    // Filters
    private composeFindUrl(gameId?: number, clientId?: number, date?: Date) : string {
        let params = "";

        if (date != null) {
            params += "date=" + date;
        }

        if (gameId != null) {
            if (params != "")
                params += "&";
            params += "idGame=" + gameId;
        }
        
        if (clientId != null) {
            if (params != "")
                params += "&";
            params += "idClient=" + clientId;
        }

        let url = "http://localhost:8080/lease";

        if (params == "")
            return url;
        else
            return (url + "?" + params);
    }
}
