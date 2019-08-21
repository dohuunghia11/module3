import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookComponent} from './book/book.component';
import {DetailBookComponent} from './detail-book/detail-book.component';
import {EditBookComponent} from './edit-book/edit-book.component';


const routes: Routes = [{
  path: 'book',
  component: BookComponent
}, {
  path: 'book/:id',
  component: DetailBookComponent
}, {
  path: 'book/:id/edit',
  component: EditBookComponent
}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
