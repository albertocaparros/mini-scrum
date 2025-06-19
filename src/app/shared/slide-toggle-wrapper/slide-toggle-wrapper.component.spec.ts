import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideToggleWrapperComponent } from './slide-toggle-wrapper.component';

describe('SlideToggleWrapperComponent', () => {
  let component: SlideToggleWrapperComponent;
  let fixture: ComponentFixture<SlideToggleWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideToggleWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideToggleWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
