// IMPORTS
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { LeaseListComponent } from './lease/lease-list/lease-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full'},
  { path: 'categories', component: CategoryListComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: 'games', component: GameListComponent },
  { path: 'clients', component: ClientListComponent },
  { path: 'leases', component: LeaseListComponent },
];

// MODULE
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
// CLASS DEFINITION
export class AppRoutingModule { }