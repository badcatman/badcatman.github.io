import { ItemIterface } from './../interfaces/item.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable()
export class ShareService {

    // tslint:disable-next-line:no-inferrable-types
    private apiUrl: string = 'http://5b9faffff5036f00142e4a61.mockapi.io/list';



    constructor(private http: HttpClient) { }
  // tslint:disable-next-line:no-inferrable-types
    public todoList: ItemIterface[];

    public getData(): Observable<ItemIterface[]> {
        // return this.todoList;
        return this.http.get<ItemIterface[]>(this.apiUrl);
    }

    public addData(item: ItemIterface) {
        // this.todoList.push(new Todo(title, done));
        // this.todoList.push(item);
        console.log(item);
        return this.http.post<ItemIterface>(this.apiUrl, item, httpOptions);
    }

    public putData(item: ItemIterface) {
        return this.http.put<ItemIterface>(`${this.apiUrl}/${item.id}`, item, httpOptions);
    }

    public deleteData(item: ItemIterface) {
        return this.http.delete<ItemIterface>(`${this.apiUrl}/${item.id}`, httpOptions);
    }
}

