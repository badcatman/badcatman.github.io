import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchBookService } from '../../services/searchbook.service';
import { AuthorInterface } from '../../interfaces/author.interface';
import { SearchAuthorsWorksInterface } from '../../interfaces/search.authors.works.interface';
import { AuthorsWorkInterface } from '../../interfaces/authors.work.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit, OnDestroy {
  public id_author: string;
  public author: AuthorInterface;
  public works: AuthorsWorkInterface[];
  public src: string;
  private subscription: Subscription;

  constructor(private activateRoute: ActivatedRoute, private search: SearchBookService) { }

  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(params => this.id_author = params['id_author']);
    this.search.searchAuthor(this.id_author).subscribe((author: AuthorInterface) => {
      this.author = author;
      this.src = `https://covers.openlibrary.org/a/id/${this.author.photos[0]}-L.jpg`;
      console.log(this.author);
      this.getWorks();
    });
  }

  public getWorks () {
    this.search.searchAuthorWorks(this.id_author).pipe(
      map((response: SearchAuthorsWorksInterface) => response['entries']),
      map((response: AuthorsWorkInterface[]) => response.filter((item) =>  item['subjects']))
    )
      .subscribe((response: AuthorsWorkInterface[]) => this.works = this.sortWorks(response).slice(0, 10));
  }

  public sortWorks(list: AuthorsWorkInterface[]) {
    return list.sort((a: any, b: any) => {
      if (a['subjects'].length < b['subjects'].length) {
        return 1;
      } else if (a['subjects'].length > b['subjects'].length) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
