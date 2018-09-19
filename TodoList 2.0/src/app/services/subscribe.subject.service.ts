import { ItemIterface } from './../interfaces/item.interface';
import { Injectable } from '@angular/core';
import { ShareService } from './share.service';

import { Subject } from 'rxjs';


@Injectable()
export class SubmitService {
    private submite$ = new Subject();
    public item: ItemIterface;
    constructor(private share: ShareService) { }
  // tslint:disable-next-line:no-inferrable-types
    public todoList: ItemIterface[];

    public onSubmit(item: ItemIterface) {
        this.submite$.next(item);
    }

    public getData() {
        return this.submite$;
    }
}
    // public onSubscribe() {
    //     return this.submite$.subscribe((data: ItemIterface) => {
    //         this.share.addData(data).subscribe((response: ItemIterface) => console.log(response));
    //         this.share.getData().subscribe((list: ItemIterface[]) => this.todoList = list);
    //     });
    //     // .subscribe((response: ItemIterface) => this.item = response);
    //     // return subscr;
    // }

