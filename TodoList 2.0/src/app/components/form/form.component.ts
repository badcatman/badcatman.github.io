import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ShareService } from '../../services/share.service';
import { ItemIterface } from '../../interfaces/item.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class AppFormComponent {
    static onSubmit = new Subject();
    myForm: FormGroup;
    todoList: ItemIterface[];

    constructor(private share: ShareService) {
        this.myForm = new FormGroup({
            'todo': new FormControl('', [
                                Validators.required
                            ]),
        });
    }

    submit() {
        const title = this.myForm.controls['todo'].value;
        const id = new Date().valueOf() + '';
        // this.share.getData().subscribe((data) => this.todoList = data);
        // this.share.addData({id, title, done: false}).subscribe(todo => this.todoList.push(todo));
        console.log(this.todoList);
        this.myForm.controls['todo'].setValue('');
        // AppFormComponent.onSubmit.next(this.todoList);
        AppFormComponent.onSubmit.next({id, title, done: false});
    }
}

