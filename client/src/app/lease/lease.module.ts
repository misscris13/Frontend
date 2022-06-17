import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaseListComponent } from './lease-list/lease-list.component';
import { LeaseEditComponent } from './lease-edit/lease-edit.component';



@NgModule({
  declarations: [
    LeaseListComponent,
    LeaseEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LeaseModule { }
