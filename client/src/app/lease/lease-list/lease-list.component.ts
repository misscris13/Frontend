// IMPORTS
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/model/Client';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';
import { LeaseEditComponent } from '../lease-edit/lease-edit.component';
import { LeaseService } from '../lease.service';
import { Lease } from '../model/Lease';

@Component({
    selector: 'app-lease-list',
    templateUrl: './lease-list.component.html',
    styleUrls: ['./lease-list.component.scss']
})
// CLASS DEFINITION
export class LeaseListComponent implements OnInit {

    // Variables
    pageNumber: number = 0;
    pageSize: number = 5;
    totalElements: number = 0;

    leases: Lease[]
    clients: Client[];
    games: Game[];
    filterGame: Game;
    filterClient: Client;
    filterDate: Date;

    dataSource = new MatTableDataSource<Lease>();
    displayedColumns: string[] = ['id', 'gameName', 'clientName', 'startDate', 'endDate', 'action'];

    constructor(
        private leaseService: LeaseService,
        private gameService: GameService,
        private clientService: ClientService,
        public dialog: MatDialog,
    ) { }

    // On load/init, load the corresponding page
    ngOnInit(): void {
        this.loadPage();

        this.clientService.getClients().subscribe(
            clients => this.clients = clients
        );

        this.gameService.getGames().subscribe(
            games => this.games = games
        );
    }

    // On cleaning the filter, re-search
    onCleanFilter(): void {
        this.filterGame = null;
        this.filterClient = null;
        this.filterDate = null;

        this.onSearch();
    }

    // On search click, filter
    onSearch(): void {
        this.loadPage();
        // this.leaseService.getFilteredLeases(game, clientId, date).subscribe(
        //     leases => this.leases = leases
        // );
    }

    // Loads the corresponding page
    loadPage(event?: PageEvent) {
        let pageable: Pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [{
                property: 'id',
                direction: 'ASC'
            }]
        }

        if (event != null) {
            pageable.pageSize = event.pageSize;
            pageable.pageNumber = event.pageIndex;
        }

        let gameId = this.filterGame != null ? this.filterGame.id : null;
        let clientId = this.filterClient != null ? this.filterClient.id : null;
        let date = this.filterDate;

        // this.leaseService.getLeases(pageable).subscribe( data => {
        //     this.dataSource.data = data.content;
        //     this.pageNumber = data.pageable.pageNumber;
        //     this.pageSize = data.pageable.pageSize;
        //     this.totalElements = data.totalElements;
        // });

        this.leaseService.getFilteredLeases(pageable, gameId, clientId, date).subscribe( data => {
            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });
    }
    
    // Creates a lease
    createLease() {
        const dialogRef = this.dialog.open(LeaseEditComponent, {
            data: {}
        });

        dialogRef.afterClosed().subscribe( result => {
            this.ngOnInit();
        });
    }

    // Edits a lease
    editLease(lease: Lease) {
        const dialogRef = this.dialog.open(LeaseEditComponent, {
            data: { lease: lease }
        });
        
        dialogRef.afterClosed().subscribe( result => {
            this.ngOnInit();
        });
    }

    // Deletes a lease
    deleteLease(lease: Lease) {
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: {title: "Eliminar préstamo", description: "Atención, si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo" }
        });

        dialogRef.afterClosed().subscribe( result => {
            if (result) {
                this.leaseService.deleteLease(lease.id).subscribe( result => {
                    this.ngOnInit();
                });
            }
        });
    }
}
