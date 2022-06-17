// IMPORTS
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaseService } from '../lease.service';
import { Lease } from '../model/Lease';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';
import { Client } from 'src/app/client/model/Client';
import { ClientService } from 'src/app/client/client.service';

@Component({
    selector: 'app-lease-edit',
    templateUrl: './lease-edit.component.html',
    styleUrls: ['./lease-edit.component.scss']
})
// CLASS DEFINITION
export class LeaseEditComponent implements OnInit {

    // Variables
    lease : Lease;
    games: Game[];
    clients: Client[];

    constructor(
        public dialogRef: MatDialogRef<LeaseEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private leaseService: LeaseService,
        private gameService: GameService,
        private clientService: ClientService,
    ) { }

    // When the edit dialog is open, decide if edit or create
    ngOnInit(): void {
        if (this.data.lease != null) {
            this.lease = Object.assign({}, this.data.lease);
        }
        else {
            this.lease = new Lease();
        }

        // Get all games
        this.gameService.getGames().subscribe( games => {
            this.games = games;
        });

        // Get all clients
        this.clientService.getClients().subscribe( clients => {
            this.clients = clients;
        });


    }

    // Saves the lease
    onSave() {
        this.leaseService.saveLease(this.lease).subscribe( result => {
            this.dialogRef.close();
        });
    }

    // Closes the dialog
    onClose() {
        this.dialogRef.close();
    }
}
