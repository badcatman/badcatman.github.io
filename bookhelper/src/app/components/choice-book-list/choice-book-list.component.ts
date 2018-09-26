  import { Component, OnInit} from '@angular/core';
  import { SearchBookService } from '../../services/searchbook.service';
  import { ShareDataService } from '../../services/sharedata.service';
  import { Observable } from 'rxjs';

  @Component({
    selector: 'app-choice-book-list',
    templateUrl: './choice-book-list.component.html',
    styleUrls: ['./choice-book-list.component.css']
  })
  export class ChoiceBookListComponent implements OnInit {
    public books: object;

    constructor(private shareData: ShareDataService) {
      // this.shareData.getData().subscribe((books) => {
      //   this.books = books;
      //   console.log(this.books);
      // });
    }

    ngOnInit() {
      this.shareData.getData().subscribe((books) => {
        this.books = books;
        console.log(this.books);
      });
    }
}
