import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mat-button',
  imports: [MatButtonModule],
  templateUrl: './mat-button-wrapper.component.html',
  styleUrl: './mat-button-wrapper.component.css',
})
export class ButtonComponent {
  appearance = input<'elevated' | 'outlined' | 'filled' | 'tonal' | ''>('');
  type = input<'button' | 'submit'>('button');
  disabled = input(false);
  label = input('Click Me');
  ariaLabel = input<string | null>(null);

  clickEvent = output<void>();

  onClick() {
    if (!this.disabled()) {
      this.clickEvent.emit();
    }
  }
}
