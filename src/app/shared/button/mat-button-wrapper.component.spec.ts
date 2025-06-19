import { TestBed, ComponentFixture } from '@angular/core/testing';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { ButtonComponent } from './mat-button-wrapper.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the label', () => {
    let mockLabel = 'Random label';
    fixture.componentRef.setInput('label', mockLabel);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain(mockLabel);
  });

  it('should be disabled when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('should have correct type', () => {
    let mockType = 'submit';
    fixture.componentRef.setInput('type', mockType);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.type).toBe(mockType);
  });

  it('should have correct aria-label', () => {
    let mockAriaLabel = 'Mock Aria Label';
    fixture.componentRef.setInput('ariaLabel', mockAriaLabel);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-label')).toBe(mockAriaLabel);
  });

  it('should emit clickEvent when clicked', () => {
    const spy = vi.spyOn(component.clickEvent, 'emit');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should not emit clickEvent when disabled', () => {
    const spy = vi.spyOn(component.clickEvent, 'emit');
    fixture.componentRef.setInput('disabled', true);

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(spy).not.toHaveBeenCalled();
  });
});
