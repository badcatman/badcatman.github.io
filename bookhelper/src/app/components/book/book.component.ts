import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { take, switchMap, filter, pluck, map } from 'rxjs/operators';
import { BookDataService } from '../../services/book-data.service';
import { SearchBookService } from '../../services/searchbook.service';
import { WorkInterface } from '../../interfaces/work.interface';
import { BookInterface } from '../../interfaces/book.interface';
import { SearchSubjectsInterface } from '../../interfaces/search-subjects.interface';
import { SubjectsWorkInterface } from '../../interfaces/subjects-work.interface';
import { SubjectInterface } from '../../interfaces/subject.interface';
import { RecommendationInterface } from '../../interfaces/recommendation.interface';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {

  public id_author: string;
  public book: BookInterface ;
  public work: WorkInterface;
  public src: string;
  public subjects: string[];
  public id: string;
  public done: boolean;
  public recommendationList: RecommendationInterface[];
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
      this.subjects = this.work.subjects;
    });

    this.bookData.getWork().pipe(take(1)).subscribe((book: BookInterface ) => {
      this.book = book;
      console.log(this.book);
    });
    this.src = `https://covers.openlibrary.org/w/id/${this.book['cover_i']}-L.jpg`;
    this.id_author = this.book.author_key[0];
  }

  click() {
    this.search.getSubjects(this.work.key.slice(7))
    .pipe(
      map((arr: SearchSubjectsInterface[]) => arr[0]['subjects'].filter((elem) =>  this.mainSubjects.indexOf(elem) >= 0 )))
    .subscribe((subject: Array<string>) => {
      subject.push('Accessible book');
      this.buildReferences(subject);
    });
  }

  public buildReferences(subject: Array<string>) {
    const subj = subject[0].toLowerCase().split(' ').join('_');
    this.search.searchReferences(subj)
      .pipe(
        map((response: SubjectInterface) => response['works']),
        map((response: SubjectsWorkInterface[]) => response.map((elem) => {
            const arr = elem['subject'].filter((item) =>  this.subjects.indexOf(item) >= 0 );
            return {key: elem['key'], subject: arr, rating: arr.length, authors: elem['authors'], title: elem['title']};
          })),
        map((response: RecommendationInterface[]) => response.map((item) => {
            if (item['authors'][0]['key'] === this.work['authors'][0]['author']['key']) {
              item.rating += 30;
              console.log(item.rating);
            }
            return item;
          })))
      .subscribe((response: RecommendationInterface[]) => {
        this.recommendationList = this.sortRecommenadation(response);
        console.log(this.recommendationList);
        this.done = true;
      });
  }

  public sortRecommenadation(list: Array<RecommendationInterface>) {
    return list.sort((a: any, b: any) => {
      if (a['rating'] < b['rating']) {
        return 1;
      } else if (a['rating'] > b['rating']) {
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
