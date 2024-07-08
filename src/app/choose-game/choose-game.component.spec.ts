import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseGameComponent } from './choose-game.component';

describe('ChooseGameComponent', () => {
  let component: ChooseGameComponent;
  let fixture: ComponentFixture<ChooseGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
