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
    public edited: boolean = false;

    editForm: FormGroup;
    constructor() {
        this.editForm = new FormGroup({
            'editInput': new FormControl('', [
                Validators.required
            ]),
        });
    }

    onToggle(event: any, todo: ItemIterface) {
        const toggleItem = {todo: todo, done: !todo.done};

        if (event.target.tagName === 'LI' || event.target.parentElement.tagName === 'DIV') {
            // todo.done = !todo.done;
            this.toggle.emit(toggleItem);
        }
    }

    onDelete(todo: ItemIterface) {
        this.delete.emit(todo);
    }

    onEdit(todo: ItemIterface) {
        const editItem = { todo: todo, done: false };

        this.edited = true;
        this.toggle.emit(editItem);
        this.editForm.controls['editInput'].setValue(todo.title);
    }

    onSaveTodo(todo: ItemIterface) {
        const newTitle = this.editForm.controls['editInput'].value;
        const savedItem = { todo: todo, newTitle: newTitle };

        this.editTodo.emit(savedItem);
        this.edited = false;
    }
}
