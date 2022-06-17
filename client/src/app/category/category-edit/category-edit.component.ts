// IMPORTS
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../category.service';
import { Category } from '../model/Category';

// COMPONENT 
@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
// CLASS DEFINITION
export class CategoryEditComponent implements OnInit {

    // Variables
    category : Category;    // category object

    constructor(
        public dialogRef: MatDialogRef<CategoryEditComponent>,  // Dialog
        @Inject(MAT_DIALOG_DATA) public data: any,  // Data
        private categoryService: CategoryService    // Category service
    ) { }

    // When initialized check for null data (either edit or create)
    ngOnInit(): void {
        if (this.data.category != null) {
            this.category = Object.assign({}, this.data.category);  // Copy data
        }
        else {
            this.category = new Category(); // Create data
        }
    }

    // When save button is clicked save data and close dialog
    onSave() {
        this.categoryService.saveCategory(this.category).subscribe(result => {
            this.dialogRef.close();
        });
    }

    // When delete button is clicked close dialog
    onClose() {
        this.dialogRef.close();
    }
}