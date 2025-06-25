import { Component, DOCUMENT, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SlideToggleWrapperComponent } from '../shared/slide-toggle-wrapper/slide-toggle-wrapper.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, SlideToggleWrapperComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private readonly document = inject(DOCUMENT);
  title = 'Mini Scrum';

  toggleTheme() {
    if (this.document.documentElement.classList.contains('dark-mode')) {
      this.document.documentElement.classList.remove('dark-mode');
    } else {
      this.document.documentElement.classList.add('dark-mode');
    }
  }
}
