// IMPORTS
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { AuthorEditComponent } from 'src/app/author/author-edit/author-edit.component';
import { AuthorService } from 'src/app/author/author.service';
import { Author } from 'src/app/author/model/Author';

// COMPONENT
@Component({
    selector: 'app-author-list',
    templateUrl: './author-list.component.html',
    styleUrls: ['./author-list.component.scss']
})
// CLASS DEFINITION
export class AuthorListComponent implements OnInit {
    // Variables
    pageNumber: number = 0; // page number
    pageSize: number = 5;   // items per page
    totalElements: number = 0;  // total elements

    dataSource = new MatTableDataSource<Author>();  // author table
    displayedColumns: string[] = ['id', 'name', 'nationality', 'action'];   // columns

    constructor(
        private authorService: AuthorService,
        public dialog: MatDialog,
    ) { }

    // Load page on initialization
    ngOnInit(): void {
        this.loadPage();
    }

    // Page loader
    loadPage(event?: PageEvent) {
        let pageable : Pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [{
                property: 'id',
                direction: 'ASC'
            }]
        }

        // If the event is not null, get size and index
        if (event != null) {
            pageable.pageSize = event.pageSize;
            pageable.pageNumber = event.pageIndex;
        }

        // Change authorService's variables
        this.authorService.getAuthors(pageable).subscribe(data => {
            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });
    }

    // Creates author
    createAuthor() {
        const dialogRef = this.dialog.open(AuthorEditComponent, {
            data: {} 
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }

    // Edits author
    editAuthor(author: Author) {
        const dialogRef = this.dialog.open(AuthorEditComponent, {
            data: { author: author } 
        });
    
        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }

    // Delets author
    deleteAuthor(author: Author) {
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: { title: "Eliminar autor", 
                description: "Atención, si borra el autor se perderán sus datos. <br> ¿Desea eliminar el autor?" }  // confirmation message
        });
    
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.authorService.deleteAuthor(author.id).subscribe(result => {
                    this.ngOnInit();
                })
            }
        });
    }
}
