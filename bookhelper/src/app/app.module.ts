import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './components/searchform/searchform.component';
import { ChoiceBookListComponent } from './components/choice-book-list/choice-book-list.component';
import { ChoiceBookItemComponent } from './components/choice-book-item/choice-book-item.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { BookComponent } from './components/book/book.component';
import { SearchBooksComponent } from './components/search-books/search-books.component';
import { AuthorComponent } from './components/author/author.component';

import { ShareDataService } from './services/sharedata.service';
import { SearchBookService } from './services/searchbook.service';
import { BookDataService } from './services/book-data.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'search', component: SearchBooksComponent},
  { path: 'search/book/:id', redirectTo: 'book/:id'},
  { path: 'search/author/:id_author', redirectTo: 'author/:id_author'},
  { path: 'book/:id', component: BookComponent},
  { path: 'book/:id/author/:id_author', redirectTo: 'author/:id_author'},
  { path: 'book/:id/book/:id', redirectTo: 'book/:id'},
  { path: 'author/:id_author', component: AuthorComponent },
  { path: 'author/:id_author/book/:id', redirectTo: 'book/:id'},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    ChoiceBookListComponent,
    ChoiceBookItemComponent,
    NotFoundComponent,
    HomeComponent,
    SearchBooksComponent,
    BookComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ShareDataService, SearchBookService, BookDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
