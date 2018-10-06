import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { SearchBookService } from '../../services/searchbook.service';
import { debounceTime, distinctUntilChanged, switchMap, map, filter } from 'rxjs/operators';
import { SearchTitleInterface } from '../../interfaces/search.title.interface';
import { BookInterface } from '../../interfaces/book.interface';



@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})


export class SearchFormComponent implements OnInit {
    public searchForm: FormGroup;
    public books: BookInterface[];
    public titles: BookInterface[];
    public done: boolean = false;
    private debounce: number = 400;

    constructor(private searchBook: SearchBookService) {
        this.searchForm = new FormGroup({
            'basicBook': new FormControl('', [
                                Validators.required
                            ]),
        });
    }
    ngOnInit() {
      this.searchForm.controls['basicBook'].valueChanges
        .pipe(debounceTime(this.debounce),
              distinctUntilChanged(),
              filter((title) => title),
              switchMap((title: string) => this.searchBook.searchTitles(title)),
              map((response: SearchTitleInterface): BookInterface[] => response['docs'])
        )
        .subscribe((response: BookInterface[]): void => {
          this.titles = response;
          this.showHint(true);
          console.log(this.titles);
        },
          (error) => console.log(error));
    }

    public submit() {
      this.showHint(false);
      const title = this.searchForm.controls['basicBook'].value;

      this.searchRecommendation(title);
    }

    public searchRecommendation(title: string) {
      this.searchForm.controls['basicBook'].setValue(title);
      this.searchBook.searchBooks(title).subscribe((response) => this.books = response['docs']);
      this.showHint(false);
    }

    public showHint(state: boolean, event?) {
      this.done = state;
      console.log(event);
    }

    public stopBlur(event) {
      event.preventDefault();
    }
}
