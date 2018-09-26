import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationlistComponent } from './recommendationlist.component';

describe('RecommendationlistComponent', () => {
  let component: RecommendationlistComponent;
  let fixture: ComponentFixture<RecommendationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
