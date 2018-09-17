import { Component, OnInit} from '@angular/core';
import { ShareService } from '../../services/share.service';
import { ItemIterface } from '../../interfaces/item.interface';
import { AppFormComponent } from '../../components/./form/form.component';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']

})


export class AppTodoListComponent implements OnInit {
    todoList: ItemIterface[];

    constructor(private share: ShareService) {
        AppFormComponent.onSubmit.subscribe((data: ItemIterface) => {
            // this.todoList = data;

            this.share.addData(data).subscribe(todo => this.todoList.push(todo));

            this.share.getData().subscribe((list: ItemIterface[]) => this.todoList = list);
            console.log(this.todoList);
        });
    }

    ngOnInit() {
        this.render();
    }

    private render() {
        this.share.getData().subscribe((data: ItemIterface[]) => this.todoList = data);
        console.log(this.todoList);
    }

    private delete($event) {
        const index = this.todoList.indexOf($event);

        this.todoList.splice(index, 1);
        this.share.deleteData($event).subscribe((data) => data);
        console.log(this.todoList);
    }

    private editTodo($event) {
        $event.todo.title = $event.newTitle;
        this.share.putData($event.todo).subscribe((data) => data);
        console.log(this.todoList);
    }

    private toggle($event) {
        $event.todo.done = $event.done;
        this.share.putData($event.todo).subscribe((data) => data);
        console.log(this.todoList);
    }
}
