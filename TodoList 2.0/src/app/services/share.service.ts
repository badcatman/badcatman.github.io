import { ItemIterface } from './../interfaces/item.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable()
export class ShareService {
    // tslint:disable-next-line:no-inferrable-types
    apiUrl: string = 'http://5b9faffff5036f00142e4a61.mockapi.io/list';

    constructor(private http: HttpClient) { }
  // tslint:disable-next-line:no-inferrable-types
    public todoList: ItemIterface[];

    public getData(): Observable<ItemIterface[]> {
        // return this.todoList;
        // return this.http.get(this.apiUrl).pipe(map((res: any) => res.json()));
        return this.http.get(this.apiUrl).pipe(map((res: ItemIterface[]) => res));
    }

    public addData(item: ItemIterface) {
        // this.todoList.push(new Todo(title, done));
        // this.todoList.push(item);
        console.log(item);
        return this.http.post<ItemIterface>(this.apiUrl, item, httpOptions);
    }

    public putData(item: ItemIterface) {
        const url = `${this.apiUrl}/${item.id}`;

        return this.http.put<ItemIterface>(url, item, httpOptions);
    }

    public deleteData(item: ItemIterface) {
        const url = `${this.apiUrl}/${item.id}`;

        return this.http.delete<ItemIterface>(url, httpOptions);
    }
}
// ${item.itemId}
