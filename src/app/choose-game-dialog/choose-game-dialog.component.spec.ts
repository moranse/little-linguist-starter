import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseGameDialogComponent } from './choose-game-dialog.component';

describe('ChooseGameDialogComponent', () => {
  let component: ChooseGameDialogComponent;
  let fixture: ComponentFixture<ChooseGameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseGameDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
