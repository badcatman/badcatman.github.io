import { Component, OnInit} from '@angular/core';
import { ShareService } from '../../services/share.service';
import { SubmitService } from '../../services/subscribe.subject.service';
import { ItemIterface } from '../../interfaces/item.interface';
import { Observable } from 'rxjs';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']

})


export class AppTodoListComponent implements OnInit {
    public todoList: ItemIterface[];
    public todoList$: Observable<ItemIterface[]>;

    constructor(private share: ShareService, private sub: SubmitService) {
        // AppFormComponent.onSubmit$.subscribe((item: ItemIterface) => {
        //     // this.todoList = data;
        //     // this.todoList.push(item);
        //     this.share.addData(item).subscribe(response => this.todoList.push(response));
        //     // this.share.addData(item).subscribe(todo => console.log(todo));
        //     // this.share.getData().subscribe((list: ItemIterface[]) => this.todoList = list);
        //     console.log(this.todoList);
        // });

        // this.sub.onSubscribe();
        // this.sub.submited$.subscribe((item: ItemIterface) => {
        //     this.share.addData(item).subscribe(response => this.todoList.push(response));
        // });
        this.sub.getData().subscribe((item: ItemIterface) => {
            this.share.addData(item).subscribe(response => this.todoList.push(response));
        });

        // this.todoList.push(item);
        // this.sub.onSubscribe().
    }

    ngOnInit() {
        // this.share.getData().subscribe((data: ItemIterface[]) => this.todoList = data);
        // this.todoList$ = this.share.getData();
        this.share.getData().subscribe((data: ItemIterface[]) => this.todoList = data);

    }

    private delete($event) {
        const index = this.todoList.indexOf($event);

        this.todoList.splice(index, 1);
        this.share.deleteData($event).subscribe((data) => console.log(data));
    }

    private editTodo($event) {
        $event.todo.title = $event.newTitle;
        this.share.putData($event.todo).subscribe((data) => console.log(data));
    }

    private toggle($event) {
        $event.todo.done = $event.done;
        this.share.putData($event.todo).subscribe((data) => console.log(data));
    }
}
