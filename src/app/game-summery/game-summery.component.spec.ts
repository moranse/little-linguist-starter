import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSummeryComponent } from './game-summery.component';

describe('GameSummeryComponent', () => {
  let component: GameSummeryComponent;
  let fixture: ComponentFixture<GameSummeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSummeryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
