import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceBookItemComponent } from './choice-book-item.component';

describe('ChoiceBookItemComponent', () => {
  let component: ChoiceBookItemComponent;
  let fixture: ComponentFixture<ChoiceBookItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceBookItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceBookItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
