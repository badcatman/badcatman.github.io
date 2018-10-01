import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchBookService } from '../../services/searchbook.service';
import { AuthorInterface } from '../../interfaces/author.interface';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit, OnDestroy {
  public id_author: string;
  public author: AuthorInterface;
  public src: string;
  private subscription: Subscription;

  constructor(private activateRoute: ActivatedRoute, private search: SearchBookService) { }

  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(params => this.id_author = params['id_author']);
    this.search.searchAuthor(this.id_author).subscribe((author: AuthorInterface) => {
      this.author = author;
      this.src = `https://covers.openlibrary.org/a/id/${this.author.photos[0]}-L.jpg`;
      console.log(this.author);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
