// IMPORTS
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { AuthorListComponent } from './author/author-list/author-list.component';

const routes: Routes = [
  { path: 'categories', component: CategoryListComponent },
  { path: 'authors', component: AuthorListComponent },
];

// MODULE
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
// CLASS DEFINITION
export class AppRoutingModule { }