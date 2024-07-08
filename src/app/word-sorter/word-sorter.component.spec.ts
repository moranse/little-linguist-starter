import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSorterComponent } from './word-sorter.component';

describe('WordSorterComponent', () => {
  let component: WordSorterComponent;
  let fixture: ComponentFixture<WordSorterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordSorterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordSorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
