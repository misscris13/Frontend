// IMPORTS
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from './model/Client';
// import { CLIENT_DATA } from './model/mock-clients'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
// CLASS DEFINITION
export class ClientService {

    constructor(
        private http: HttpClient,
    ) { }

    // GET Petition
    getClients(): Observable<Client[]> { 
        return this.http.get<Client[]>('http://localhost:8080/client');
    }

    // PUT Petition
    saveClient(client: Client): Observable<Client> {
        let url = "http://localhost:8080/client"

        if (client.id != null)
            url += "/" + client.id;

        return this.http.put<Client>(url, client);
    }

    // DELETE Petition
    deleteClient(idClient: number): Observable<any> {
        return this.http.delete('http://localhost:8080/client/' + idClient);
    }
}
