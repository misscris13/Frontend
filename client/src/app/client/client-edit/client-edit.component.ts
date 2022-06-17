// IMPORTS
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { Client } from '../model/Client';

@Component({
    selector: 'app-client-edit',
    templateUrl: './client-edit.component.html',
    styleUrls: ['./client-edit.component.scss']
})
// CLASS DEFINITION
export class ClientEditComponent implements OnInit {

    // Variables
    client : Client;    // client object
    dupe : Boolean;     // if the name is duplicated or not
    names : String[] = [];  // array of all client names
    errorMessage : String;  // message to display when client name is in use

    constructor(
        public dialogRef: MatDialogRef<ClientEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private clientService: ClientService,
    ) { }

    // On loading this window, decide if editing or creating a client and fill names[]
    ngOnInit(): void {
        this.client = new Client();
        if (this.data.client != null) {
            this.client = Object.assign({}, this.data.client);
        }
        else {
            this.client = new Client();
        }

        this.clientService.getClients().subscribe(
            clients => {clients.forEach(c => this.names.push(c.name))}
        );

        this.dupe = false;  // starts out as false
    
        this.errorMessage = "El nombre no puede coincidir con otro ya existente";
    }

    // Check if dupe, if not, save the client
    onSave() {
        this.dupe = this.names.indexOf(this.client.name) > -1;

        if (!this.dupe) {
            this.clientService.saveClient(this.client).subscribe(result => {
                this.dialogRef.close();
            })
        }
    }

    // Close the dialog
    onClose() {
        this.dialogRef.close();
    }
}
