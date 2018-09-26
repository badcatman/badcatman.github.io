import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from '../../services/sharedata.service';

@Component({
  selector: 'app-choice-book-item',
  templateUrl: './choice-book-item.component.html',
  styleUrls: ['./choice-book-item.component.css']
})
export class ChoiceBookItemComponent implements OnInit {
  @Input() bookItem: object;
  public src: string;
  public img: number;
  public id: string;

  constructor(private sub: ShareDataService) { }

  ngOnInit() {
    this.img = this.bookItem['cover_i'];
    this.src = `https://covers.openlibrary.org/w/id/${this.img}-M.jpg`;
    this.id = this.bookItem['key'].slice(7);
    console.log(this.id);
    console.log(this.bookItem);
  }

  public sendWork(work: object) {
    this.sub.onSendWork(work);
  }
}
