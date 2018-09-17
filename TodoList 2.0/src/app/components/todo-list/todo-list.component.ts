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
            this.todoList.push(data);
            this.share.addData(data).subscribe(todo => todo);
            console.log('1');
        });
    }

    ngOnInit() {
        this.render();
    }

    private render() {
        this.share.getData().subscribe((data: ItemIterface[]) => this.todoList = data);
    }

    private delete($event) {
        const index = this.todoList.indexOf($event);

        this.todoList.splice(index, 1);
        this.share.deleteData($event).subscribe((data) => data);
    }

    private editTodo($event) {
        $event.todo.title = $event.newTitle;
        this.share.putData($event.todo).subscribe((data) => data);
    }

    private toggle($event) {
        $event.todo.done = $event.done;
        this.share.putData($event.todo).subscribe((data) => data);
    }
}
