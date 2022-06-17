// IMPORTS
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../model/Client';
import { ClientService } from '../client.service';
import { MatDialog } from '@angular/material/dialog';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { Category } from 'src/app/category/model/Category';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';

@Component({
    selector: 'app-client-list',
    templateUrl: './client-list.component.html',
    styleUrls: ['./client-list.component.scss']
})
// CLASS DEFINITION
export class ClientListComponent implements OnInit {

    dataSource = new MatTableDataSource<Client>();  // client table
    displayedColumns: string[] = ['id', 'name', 'action'];  // columns

    constructor(
        private clientService: ClientService,
        public dialog: MatDialog,
    ) { }

    // On loading the list, get clients
    ngOnInit(): void {
        this.clientService.getClients().subscribe(
            clients => this.dataSource.data = clients
        );
    }

    // Creates a client
    createClient() {
        const dialogRef = this.dialog.open(ClientEditComponent, {
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }

    // Edits a client
    editClient(client: Client) {
        const dialogRef = this.dialog.open(ClientEditComponent, {
            data: { client: client }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }

    // Deletes a client
    deleteClient(client: Client) {
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            // Confirmation message
            data: { title: "Eliminar cliente", description: "Atención, si borra el cliente se perderán sus datos. <br> ¿Desea eliminar el cliente?" }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.clientService.deleteClient(client.id).subscribe(result => {
                    this.ngOnInit();
                });
            }
        });
    }
}
