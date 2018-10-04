import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { BookDataService } from '../../services/book-data.service';
import { BookInterface } from '../../interfaces/book.interface';

@Component({
  selector: 'app-choice-book-item',
  templateUrl: './choice-book-item.component.html',
  styleUrls: ['./choice-book-item.component.css']
})
export class ChoiceBookItemComponent implements OnInit {
  @Input() bookItem: BookInterface;
  public src: string;
  public img: number;
  public id: string;

  constructor(private bookData: BookDataService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.img = this.bookItem['cover_i'];
    this.src = `https://covers.openlibrary.org/w/id/${this.img}-M.jpg`;
    this.id = this.bookItem['key'].slice(7);
    console.log(this.id);
    console.log(this.bookItem);
  }

  public sendWork(book: BookInterface) {
    this.bookData.onSendWork(book);
    // this.router.navigate([`book/:${this.id}`]);
  }
}
