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

    errorDates: Boolean;
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

            if (this.lease.game != null) {
                let gameFilter: Game[] = games.filter(game => game.id == this.data.lease.game.id);
                if (gameFilter != null) {
                    this.lease.game = gameFilter[0];
                }
            }
        });

        // Get all clients
        this.clientService.getClients().subscribe( clients => {
            this.clients = clients;

            if (this.lease.client != null) {
                let clientFilter: Client[] = clients.filter(client => client.id == this.data.lease.client.id);
                if (clientFilter != null) {
                    this.lease.client = clientFilter[0];
                }
            }
        });

        // Get all leases
        this.leaseService.getAll().subscribe( 
            leases => this.leases = leases
        );

        //this.leases.forEach(l => this.lentGames.push(l.game));
        //this.leases.forEach(l => this.lentClients.push(l.client));

        this.error = false;
    }

    // Saves the lease
    onSave() {
        // this.errorDates = (this.lease.startDate > this.lease.endDate);
        // if (this.errorDates)
        //     this.errorMessage = "La fecha de fin no puede ser menor que la de inicio. \n"
        // else
        //     this.tooManyDays = (Math.ceil((this.lease.endDate.valueOf() - this.lease.startDate.valueOf())/(1000*3600*24))) > 14;

        // if (this.tooManyDays)
        //     this.errorMessage = "No se puede prestar por más de 14 días. \n";

        //this.tooManyLeases = this.lentClients.indexOf(this.lease.client) > -1;
        //if (this.tooManyLeases)
        //    this.errorMessage += "Este cliente ya tiene un juego prestado. \n";

        //this.alreadyLent = this.lentGames.indexOf(this.lease.game) > -1;
        this.alreadyLent = false;

        this.error = this.errorDates || this.tooManyDays || this.tooManyLeases || this.alreadyLent;

        if (!this.error)
            this.leaseService.saveLease(this.lease).subscribe( result => {
                this.dialogRef.close();
            });
    }

    // Closes the dialog
    onClose() {
        this.dialogRef.close();
    }
}
