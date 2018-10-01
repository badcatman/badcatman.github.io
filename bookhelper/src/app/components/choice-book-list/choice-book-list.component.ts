  import { Component, OnInit} from '@angular/core';
  import { SearchBookService } from '../../services/searchbook.service';
  import { ShareDataService } from '../../services/sharedata.service';
  import { Observable } from 'rxjs';
  import { BookInterface } from '../../interfaces/book.interface';

  @Component({
    selector: 'app-choice-book-list',
    templateUrl: './choice-book-list.component.html',
    styleUrls: ['./choice-book-list.component.css']
  })
  export class ChoiceBookListComponent implements OnInit {
    public books: [BookInterface];

    constructor(private shareData: ShareDataService) {}

    ngOnInit() {
      this.shareData.getData().subscribe((books: [BookInterface]) => {
        this.books = books;
        console.log(this.books);
      });
    }
}
