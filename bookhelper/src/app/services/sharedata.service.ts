import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SearchTitleInterface } from '../interfaces/search.title.interface';
import { BookInterface } from '../interfaces/book.interface';


@Injectable()
export class ShareDataService {
    public books: BookInterface[];
    public listOfBooks$ = new Subject<BookInterface[]>();

    constructor() { }

    public onSearch(observ: Observable<SearchTitleInterface>) {
        observ.subscribe((response: SearchTitleInterface) => {
            this.books = response['docs'];
            this.listOfBooks$.next(this.books);
        });
    }

    public getData(): Subject<{}> {
        return this.listOfBooks$;
    }
}
