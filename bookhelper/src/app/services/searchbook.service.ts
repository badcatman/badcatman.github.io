import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ShareDataService } from './sharedata.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable()
export class SearchBookService {
    public books: object;
    public search$: Observable<object>;
    // tslint:disable-next-line:no-inferrable-types
    private apiUrl: string = 'http://openlibrary.org';

    constructor(private http: HttpClient, private shareData: ShareDataService) { }

    public search(title: string) {
        // const searchUrl = `query.json?type=/type/work&title=The%20Hobbit`;
        const searchUrl = `search.json?title=${title}&limit=1`;
        return this.http.get(`${this.apiUrl}/${searchUrl}`);
    }
    public searchBooks(title: string): Observable<object> {
      // const searchUrl = `query.json?type=/type/work&title=The%20Hobbit`;
      const searchUrl = `search.json?title=${title}&limit=6`;

      this.search$ = this.http.get(`${this.apiUrl}/${searchUrl}`);
      this.search$.subscribe((response) => this.books = response['docs']);
      this.shareData.onSearch(this.search$);
      return this.search$;
    }
}
