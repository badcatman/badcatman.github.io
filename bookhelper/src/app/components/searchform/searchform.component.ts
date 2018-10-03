import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { SearchBookService } from '../../services/searchbook.service';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
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
    private done: boolean = false;
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
        .pipe(debounceTime(this.debounce), distinctUntilChanged(),
              switchMap((response: string) => this.searchBook.searchTitles(response)),
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
      const title = this.searchForm.controls['basicBook'].value;

      this.searchRecommendation(title);
    }

    public searchRecommendation(title: string) {
      this.showHint(false);

      this.searchForm.controls['basicBook'].setValue('');
      this.searchBook.searchBooks(title).subscribe((response) => this.books = response['docs']);
    }

    public showHint(state: boolean, event?) {
      this.done = state;
      console.log(event);
    }

    public stopBlur(event) {
      event.preventDefault();
    }
}
