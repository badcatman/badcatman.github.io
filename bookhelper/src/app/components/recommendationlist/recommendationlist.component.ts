import { Component, OnInit} from '@angular/core';
import { SearchBookService } from '../../services/searchbook.service';
import { ShareDataService } from '../../services/sharedata.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recommendationlist',
  templateUrl: './recommendationlist.component.html',
  styleUrls: ['./recommendationlist.component.css']
})
export class RecommendationlistComponent implements OnInit {
  public books: object;

  constructor(private shareData: ShareDataService) {
    this.shareData.getData().subscribe((books) => this.books = books);
  }

  ngOnInit() {
  }

}
