import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { ShareDataService } from '../../services/sharedata.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit, OnChanges {

  private id: string;
  public work: any;
  private subscription: Subscription;
  public subject: object;
  public self: any;

  constructor(private activateRoute: ActivatedRoute, private sub: ShareDataService) {}

  ngOnInit() {
    const self = this;
    this.subscription = this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.sub.getWork().subscribe((work: any) => {
      this.work = work;
      console.log(this.work);
    });
        console.log(this.work);
  }

  public onClick() {
    debugger;
  }

  ngOnChanges() {
    // this.sub.getWork().subscribe((work: object) => {
    //   this.work = work;
    //   console.log(this.work);
    // });
  }
}
