import { Injectable } from '@angular/core';
import { Subject, Observable, ReplaySubject, AsyncSubject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookDataService {
    public book$ = new BehaviorSubject<any>(1);
    public bookItem = this.book$.asObservable();

    constructor() { }

    public onSendWork(item: any) {
      this.book$.next(item);
    }
    public getWork() {
        return this.book$;
    }
}
