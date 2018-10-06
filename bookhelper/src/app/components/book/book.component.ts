import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { take, switchMap, pluck, map } from 'rxjs/operators';
import { BookDataService } from '../../services/book-data.service';
import { SearchBookService } from '../../services/searchbook.service';
import { WorkInterface } from '../../interfaces/work.interface';
import { BookInterface } from '../../interfaces/book.interface';
import { SearchSubjectsInterface } from '../../interfaces/search-subjects.interface';
import { SubjectsWorkInterface } from '../../interfaces/subjects-work.interface';

import { RecommendationInterface } from '../../interfaces/recommendation.interface';
import { AuthorInterface } from '../../interfaces/author.interface';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {

  public id_author: string;
  public book: BookInterface ;
  public work: WorkInterface;
  public author: AuthorInterface;
  public src: string;
  public cover: number;
  public subjects: string[];
  public id: string;
  public done: boolean;
  public recommendationList: RecommendationInterface[] = [];
  public mainSubjects: string[] = [
    'History',
    'Biography',
    'Fantasy',
    'Politics and government ',
    'Juvenile literature',
    'Description and travel',
    'Social life and customs',
    'Education',
    'Philosophy',
    'Poetry',
    'Art',
    'Science',
    'Romance',
    'Mystery and detective stories',
    'Music',
    'Medicine',
    'Religion',
    'Children',
    'Science fiction'
  ];
  private subscription: Subscription;

  constructor(private bookData: BookDataService,
              private activateRoute: ActivatedRoute,
              private search: SearchBookService) {}

  ngOnInit() {
    this.done = false;
    // this.subscription = this.activateRoute.params.subscribe(params => this.id = params['id']);
    this.subscription = this.activateRoute.params
    .pipe(switchMap((params) => this.search.searchWork(params['id'])))
    .subscribe((work: WorkInterface) => {
      this.work = work;
      console.log('WORK: ', this.work);
      this.subjects = this.work.subjects;
      this.id_author = this.work.authors[0].author['key'].slice(9);
      this.cover = this.work['covers'][0];
      this.src = `https://covers.openlibrary.org/w/id/${this.cover}-L.jpg`;
      this.getAuthor();
    });

    this.bookData.getWork().pipe(take(1)).subscribe((book: BookInterface ) => {
      this.book = book;
      console.log('BOOK: ', this.book);
    });
    // this.src = `https://covers.openlibrary.org/w/id/${this.book['cover_i']}-L.jpg`;

  }

  click() {
    this.search.getSubjects(this.work.key.slice(7))
    .pipe(
      map((arr: SearchSubjectsInterface[]) => arr[0]),
      pluck('subjects'),
      map((arr: string[]) => {
        // const msubject = this.mainSubjects;
        return arr.find((elem) => this.mainSubjects.indexOf(elem) >= 0);
      })
    )
      // map((arr: SearchSubjectsInterface[]) => arr[0]['subjects'].filter((elem) =>  this.mainSubjects.indexOf(elem) >= 0 )))
    .subscribe((subject: string = 'Accessible book') => {
      // subject.push('Accessible book');
      this.buildReferences(subject);
    });
  }

  public getAuthor() {
    this.search.searchAuthor(this.id_author).subscribe((author: AuthorInterface) => this.author = author);
  }

  public buildReferences(subj: string) {
    const subjct = subj.toLowerCase().split(' ').join('_');
    this.search.searchReferences(subjct)
      .pipe(
        // map((response: SubjectInterface) => response['works']),
        pluck('works'),
        map((response: SubjectsWorkInterface[]) => response.map(({key, subject, authors, title}) => {
            const arr = subject.filter((item) =>  this.subjects.indexOf(item) >= 0 );

            return {key: key.slice(7), subject: arr, rating: arr.length, authors, title};
          })),
        map((response: RecommendationInterface[]) => response.map((item) => {
            if (item['authors'][0]['key'] === this.work['authors'][0]['author']['key']) {
              item.rating += 30;
              console.log(item.rating);
              console.log(item.key);
            }

            return item;
          })))
      .subscribe((response: RecommendationInterface[]) => {
        this.recommendationList = this.sortRecommendation(response).slice(0, 10);
        console.log(this.recommendationList);
        this.done = true;
      });
  }

  public sortRecommendation(list: Array<RecommendationInterface>) {
    return list.sort(({rating: ratingA}, {rating: ratingB}) => {
      return ratingA < ratingB ? 1 : -1;
    });
  }

  // public sortRecommendation(list: Array<RecommendationInterface>) {
  //   return list.sort((a: any, b: any) => {
  //     if (a['rating'] < b['rating']) {
  //       return 1;
  //     } else if (a['rating'] > b['rating']) {
  //       return -1;
  //     } else {
  //       return 0;
  //     }
  //   });
  // }

  public showRecommendation(state) {
    this.done = state;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
