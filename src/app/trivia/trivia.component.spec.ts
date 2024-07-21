import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaComponent } from './trivia.component';

describe('TriviaComponent', () => {
  let component: TriviaComponent;
  let fixture: ComponentFixture<TriviaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriviaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TriviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
