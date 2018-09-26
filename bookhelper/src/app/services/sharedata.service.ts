import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable()
export class ShareDataService {
    public books: object;
    public listOfBooks$ = new Subject<{}>();
    public work$ = new Subject<any>();

    constructor() { }

    public onSearch(observ: Observable<object>) {
        observ.subscribe((response) => {
            this.books = response['docs'];
            this.listOfBooks$.next(this.books);
        });
    }

    public getData(): Subject<{}> {
        return this.listOfBooks$;
    }
    public onSendWork(item: any) {
        this.work$.next(item);
    }
    public getWork() {
        return this.work$;
    }
}
