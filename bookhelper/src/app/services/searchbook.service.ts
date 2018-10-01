import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ShareDataService } from './sharedata.service';
import { WorkInterface } from '../interfaces/work.interface';
import { AuthorInterface } from '../interfaces/author.interface';
import { SearchTitleInterface } from '../interfaces/search.title.interface';
import { SearchSubjectsInterface } from '../interfaces/search-subjects.interface';
import { SubjectsWorkInterface } from '../interfaces/subjects-work.interface';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable()
export class SearchBookService {
    public books: object;
    public search$: Observable<SearchTitleInterface>;
    public work$: Observable<WorkInterface>;
    public author$: Observable<AuthorInterface>;
    public subjects$: Observable<SearchSubjectsInterface[]>;
    public  references$: Observable<SubjectsWorkInterface>;
    // tslint:disable-next-line:no-inferrable-types
    private apiUrl: string = 'http://openlibrary.org';

    constructor(private http: HttpClient, private shareData: ShareDataService) { }

    public searchBooks(title: string): Observable<SearchTitleInterface> {
      // const searchUrl = `query.json?type=/type/work&title=The%20Hobbit`;
      const searchUrl = `search.json?title=${title}&limit=6`;

      this.search$ = this.http.get<SearchTitleInterface>(`${this.apiUrl}/${searchUrl}`);
      this.shareData.onSearch(this.search$);
      return this.search$;
    }

    public searchWork(id: string): Observable<WorkInterface> {
      const searchUrl = `works/${id}.json`;

      this.work$ = this.http.get<WorkInterface>(`${this.apiUrl}/${searchUrl}`);
      return this.work$;
    }

    public searchAuthor(id_author: string): Observable<AuthorInterface> {
      const searchUrl = `authors/${id_author}.json`;

      this.author$ = this.http.get<AuthorInterface>(`${this.apiUrl}/${searchUrl}`);
      return this.author$;
    }

    public getSubjects(id: string): Observable<SearchSubjectsInterface> {
      const searchUrl = `query.json?type=/type/work&key=/works/${id}&subjects=`;

      this.subjects$ = this.http.get<SearchSubjectsInterface>(`${this.apiUrl}/${searchUrl}`);
      return this.subjects$;
    }

    public searchReferences(subject: string): Observable<SubjectsWorkInterface> {
      const searchUrl = `subjects/${subject}.json?limit=500`;
      console.log(searchUrl);

      this.references$ = this.http.get<SubjectsWorkInterface>(`${this.apiUrl}/${searchUrl}`);
      return this.references$;
    }
}
