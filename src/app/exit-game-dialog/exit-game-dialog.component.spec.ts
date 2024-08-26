import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitGameDialogComponent } from './exit-game-dialog.component';

describe('ExitGameDialogComponent', () => {
  let component: ExitGameDialogComponent;
  let fixture: ComponentFixture<ExitGameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExitGameDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExitGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
