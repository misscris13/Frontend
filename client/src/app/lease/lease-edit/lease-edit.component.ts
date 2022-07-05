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
    clientLeases: Lease[];
    games: Game[];
    gameLeases: Lease[];
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

        this.error = false;
    }

    // Saves the lease
    onSave() {
        this.errorDates = false;    // end date is bigger than start date
        this.tooManyDays = false;   // lent for more than 14 days
        this.tooManyLeases = false; // client has leases in the same day as new lease
        this.alreadyLent = false;   // game is already lent to someone in those days
        this.clientLeases = [];
        this.gameLeases = [];

        this.errorDates = (this.lease.startDate > this.lease.endDate);

        if (this.errorDates)
            this.errorMessage = "La fecha de fin no puede ser menor que la de inicio."
        else
            this.tooManyDays = (Math.ceil((new Date(this.lease.endDate).valueOf() - new Date(this.lease.startDate).valueOf())/(1000*3600*24))) > 14;

        if (this.tooManyDays)
            this.errorMessage = "No se puede prestar por más de 14 días.";

        this.leases.forEach(l => {
            if ((l.client.id == this.lease.client.id) && (l.id != this.lease.id))
                this.clientLeases.push(l)
            });

        if (this.clientLeases.length > 0) { // client has leases
            this.clientLeases.forEach(l => this.tooManyLeases = this.tooManyLeases
                || ((this.lease.startDate >= l.startDate)
                && (this.lease.endDate <= l.endDate)));

            this.errorMessage = "Este cliente ya tiene un juego prestado.";
        }

        this.leases.forEach(l => {
            if ((l.game.id == this.lease.game.id) && (l.id != this.lease.id)) 
                this.gameLeases.push(l)
        });
        
        if (this.gameLeases.length > 0) { // game has been lent
            this.gameLeases.forEach(l => this.alreadyLent = this.alreadyLent
                || ((this.lease.startDate >= l.startDate)
                && (this.lease.endDate <= l.endDate)));

            this.errorMessage = "Este juego ya está prestado.";
        }

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
