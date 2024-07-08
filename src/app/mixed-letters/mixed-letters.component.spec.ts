import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedLettersComponent } from './mixed-letters.component';

describe('MixedLettersComponent', () => {
  let component: MixedLettersComponent;
  let fixture: ComponentFixture<MixedLettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixedLettersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MixedLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
