import { Component, EventEmitter, Input, Output} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { ItemIterface } from '../../interfaces/item.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})


export class AppTodoItemComponent {
    @Input() todoItem: ItemIterface;
    @Output() delete = new EventEmitter<ItemIterface>();
    @Output() editTodo = new EventEmitter<object>();
    @Output() toggle = new EventEmitter<object>();

    // tslint:disable-next-line:no-inferrable-types
    edited: boolean = false;

    editForm: FormGroup;
    constructor() {
        this.editForm = new FormGroup({
            'editInput': new FormControl('', [
                Validators.required
            ]),
        });
    }

    onToggle(event: any, todo: ItemIterface) {
        if (event.target.tagName === 'LI' || event.target.parentElement.tagName === 'DIV') {
            // todo.done = !todo.done;
            this.toggle.emit({todo: todo, done: !todo.done});
        }
    }

    onDelete(todo: ItemIterface) {
        this.delete.emit(todo);
    }

    onEdit(todo: ItemIterface) {
        this.edited = true;
        this.toggle.emit({todo: todo, done: false});
        this.editForm.controls['editInput'].setValue(todo.title);
    }

    onEditTodo(todo: ItemIterface) {
        const newTitle = this.editForm.controls['editInput'].value;

        this.editTodo.emit({todo: todo, newTitle: newTitle});
        this.edited = false;
    }
}
