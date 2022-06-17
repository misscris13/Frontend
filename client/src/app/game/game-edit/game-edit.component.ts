// IMPORTS
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorService } from 'src/app/author/author.service';
import { Author } from 'src/app/author/model/Author';
import { CategoryService } from 'src/app/category/category.service';
import { Category } from 'src/app/category/model/Category';
import { GameService } from '../game.service';
import { Game } from '../model/Game';

@Component({
    selector: 'app-game-edit',
    templateUrl: './game-edit.component.html',
    styleUrls: ['./game-edit.component.scss']
})
// CLASS DEFINITION
export class GameEditComponent implements OnInit {

    game: Game; // game object
    authors: Author[];  // list of authors
    categories: Category[]; // list of categories

    constructor(
        public dialogRef: MatDialogRef<GameEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private gameService: GameService,
        private categoryService: CategoryService,
        private authorService: AuthorService,
    ) { }

    // On loading the dialog, decide if creating or editing
    ngOnInit(): void {
        if (this.data.game != null) {
            this.game = Object.assign({}, this.data.game);
        }
        else {
            this.game = new Game();
        }

        // get all categories
        this.categoryService.getCategories().subscribe(
            categories => {
                this.categories = categories;

                if (this.game.category != null) {
                    let categoryFilter: Category[] = categories.filter(category => category.id == this.data.game.category.id);
                    if (categoryFilter != null) {
                        this.game.category = categoryFilter[0];
                    }
                }
            }
        );

        // get all authors
        this.authorService.getAllAuthors().subscribe(
            authors => {
                this.authors = authors;

                if (this.game.author != null) {
                    let authorFilter: Author[] = authors.filter(author => author.id == this.data.game.author.id);
                    if (authorFilter != null) {
                        this.game.author = authorFilter[0];
                    }
                }
            }
        );
    }

    // Save the game
    onSave() {
        this.gameService.saveGame(this.game).subscribe(result => {
            this.dialogRef.close();
        });
    }

    // Close the dialog
    onClose() {
        this.dialogRef.close();
    }
}
