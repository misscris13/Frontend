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
    leases: Lease[];
    lentGames: Game[];
    lentClients: Client[];
    games: Game[];
    clients: Client[];

    tooManyLeases: Boolean;
    tooManyDays: Boolean;
    alreadyLent: Boolean;
    error: Boolean;
    errorMessage: String;

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

        // Get all leases
        this.leaseService.getAll().subscribe( leases => {
            this.leases = leases;
        })

        this.leases.forEach(l => this.lentGames.push(l.game));
        this.leases.forEach(l => this.lentClients.push(l.client));

        this.error = false;
        this.errorMessage = "";
    }

    // Saves the lease
    onSave() {
        this.tooManyDays = (this.lease.endDate.valueOf() - this.lease.startDate.valueOf()) > 14;
        if (this.tooManyDays)
            this.errorMessage += "\n No se puede prestar por más de 14 días.";

        this.tooManyLeases = this.lentClients.indexOf(this.lease.client) > -1;
        if (this.tooManyLeases)
            this.errorMessage += "\n Este cliente ya tiene un juego prestado.";

        //this.alreadyLent = this.lentGames.indexOf(this.lease.game) > -1;
        this.alreadyLent = false;

        this.error = this.tooManyDays || this.tooManyLeases || this.alreadyLent;

        this.leaseService.saveLease(this.lease).subscribe( result => {
            this.dialogRef.close();
        });
    }

    // Closes the dialog
    onClose() {
        this.dialogRef.close();
    }
}
