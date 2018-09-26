import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceBookListComponent } from './choice-book-list.component';

describe('ChoiceBookListComponent', () => {
  let component: ChoiceBookListComponent;
  let fixture: ComponentFixture<ChoiceBookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceBookListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
