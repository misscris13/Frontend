import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { Client } from '../model/Client';

@Component({
    selector: 'app-client-edit',
    templateUrl: './client-edit.component.html',
    styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {

    client : Client;
    dupe : Boolean;
    names : String[] = [];
    errorMessage : String;

    constructor(
        public dialogRef: MatDialogRef<ClientEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private clientService: ClientService,
    ) { }

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

        this.dupe = false;
    
        this.errorMessage = "El nombre no puede coincidir con otro ya existente";
    }

    onSave() {
        this.dupe = this.names.indexOf(this.client.name) > -1;

        if (!this.dupe) {
            this.clientService.saveClient(this.client).subscribe(result => {
                this.dialogRef.close();
            })
        }
    }

    onClose() {
        this.dialogRef.close();
    }
}
