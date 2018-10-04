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
import { SubjectInterface } from '../interfaces/subject.interface';
import { SearchAuthorsWorksInterface } from '../interfaces/search.authors.works.interface';


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
    public authorWorks$: Observable<SearchAuthorsWorksInterface>;
    public subjects$: Observable<SearchSubjectsInterface[]>;
    public references$: Observable<SubjectInterface>;
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

    public getSubjects(id: string): Observable<SearchSubjectsInterface[]> {
      const searchUrl = `query.json?type=/type/work&key=/works/${id}&subjects=`;

      this.subjects$ = this.http.get<SearchSubjectsInterface[]>(`${this.apiUrl}/${searchUrl}`);
      return this.subjects$;
    }

    public searchReferences(subject: string): Observable<SubjectInterface> {
      const searchUrl = `subjects/${subject}.json?limit=100`;
      console.log(searchUrl);

      this.references$ = this.http.get<SubjectInterface>(`${this.apiUrl}/${searchUrl}`);
      return this.references$;
    }

    public searchTitles(title: string): Observable<SearchTitleInterface> {
      const searchUrl = `search.json?title=${title}&limit=3`;

      return this.http.get<SearchTitleInterface>(`${this.apiUrl}/${searchUrl}`);
    }

    public searchAuthorWorks(id_author: string): Observable<SearchAuthorsWorksInterface> {
      const searchUrl = `authors/${id_author}/works.json?limit=1000`;

      this.authorWorks$ = this.http.get<SearchAuthorsWorksInterface>(`${this.apiUrl}/${searchUrl}`);
      return this.authorWorks$;
    }
}
