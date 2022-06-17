// IMPORTS
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorService } from '../author.service';
import { Author } from '../model/Author';

// COMPONENT
@Component({
    selector: 'app-author-edit',
    templateUrl: './author-edit.component.html',
    styleUrls: ['./author-edit.component.scss']
})
// CLASS DEFINITION
export class AuthorEditComponent implements OnInit {
    // Variables
    author : Author;    // author object

    constructor(
        public dialogRef: MatDialogRef<AuthorEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private authorService: AuthorService,
    ) { }

    // On initialization, decide if creating or editing an author
    ngOnInit(): void {
        if (this.data.author != null) { // author exists
            this.author = Object.assign({}, this.data.author);  // copy existing data
        }
        else {  // author doesn't exist
            this.author = new Author(); // create author
        }
    }

    // Create or edit
    onSave() {
        this.authorService.saveAuthor(this.author).subscribe(result => {
            this.dialogRef.close();
        });
    }

    // Close dialog
    onClose() {
        this.dialogRef.close();
    }
}