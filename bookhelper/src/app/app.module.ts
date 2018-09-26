import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './components/searchform/searchform.component';
import { RecommendationlistComponent } from './components/recommendationlist/recommendationlist.component';
import { ChoiceBookListComponent } from './components/choice-book-list/choice-book-list.component';
import { ChoiceBookItemComponent } from './components/choice-book-item/choice-book-item.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';

import { ShareDataService } from './services/sharedata.service';
import { SearchBookService } from './services/searchbook.service';
import { SearchBooksComponent } from './components/search-books/search-books.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'search', component: SearchBooksComponent},
  { path: 'search/book/:id', redirectTo: 'book/:id'},
  { path: 'book/:id', component: BookItemComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    RecommendationlistComponent,
    ChoiceBookListComponent,
    ChoiceBookItemComponent,
    BookItemComponent,
    NotFoundComponent,
    HomeComponent,
    SearchBooksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ShareDataService, SearchBookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
