import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessOrFailDialogComponent } from './success-or-fail-dialog.component';

describe('SuccessOrFailDialogComponent', () => {
  let component: SuccessOrFailDialogComponent;
  let fixture: ComponentFixture<SuccessOrFailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessOrFailDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessOrFailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
