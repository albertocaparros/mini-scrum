import { Component, input, output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-slide-toggle-wrapper',
  imports: [MatSlideToggleModule],
  templateUrl: './slide-toggle-wrapper.component.html',
  styleUrl: './slide-toggle-wrapper.component.css',
})
export class SlideToggleWrapperComponent {
  hideIcon = input<boolean>(false);
  label = input<string>('');
  labelPosition = input<'before' | 'after'>('before');

  toggleEvent = output<void>();

  onToggleChange() {
    this.toggleEvent.emit();
  }
}
