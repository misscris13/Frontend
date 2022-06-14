import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from './model/Client';
import { CLIENT_DATA } from './model/mock-clients'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    constructor(
        private http: HttpClient,
    ) { }

    getClients(): Observable<Client[]> { 
        return this.http.get<Client[]>('http://localhost:8080/client');
    }

    saveClient(client: Client): Observable<Client> {
        return of(null);
    }

    deleteClient(idClient: number): Observable<any> {
        return of(null);
    }
}
