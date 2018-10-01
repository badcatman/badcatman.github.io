import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { SearchBookService } from '../../services/searchbook.service';
import { ShareDataService } from '../../services/sharedata.service';


@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})


export class SearchFormComponent {
    searchForm: FormGroup;
    book: object;
    books: Array<object>;
    subjects: Array<string> = [];
    constructor(private searchBook: SearchBookService) {
        this.searchForm = new FormGroup({
            'basicBook': new FormControl('', [
                                Validators.required
                            ]),
        });
    }

    searchRecommendation() {
      const title = this.searchForm.controls['basicBook'].value;

      this.searchForm.controls['basicBook'].setValue('');
      this.searchBook.searchBooks(title).subscribe((response) => {
        this.books = response['docs'];
        // console.log(this.books);
      });
    }
}
