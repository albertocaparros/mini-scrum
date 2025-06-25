import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { describe, beforeEach, it, expect } from 'vitest';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let documentElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    documentElement = document.documentElement;
    documentElement.classList.remove('dark-mode');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Mini Scrum');
  });

  it('should render the toggle component', () => {
    const toggle = fixture.nativeElement.querySelector('app-slide-toggle-wrapper');
    expect(toggle).toBeTruthy();
  });

  it('should toggle dark mode', () => {
    expect(documentElement.classList.contains('dark-mode')).toBeFalsy();

    component.toggleTheme();
    fixture.detectChanges();
    expect(documentElement.classList.contains('dark-mode')).toBeTruthy();

    component.toggleTheme();
    fixture.detectChanges();
    expect(documentElement.classList.contains('dark-mode')).toBeFalsy();
  });
});
