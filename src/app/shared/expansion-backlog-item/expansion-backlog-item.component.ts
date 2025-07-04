import { Component, input, output, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { BacklogItem } from '../models/backlog-item';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-expansion-backlog-item',
  imports: [MatExpansionModule, MatIconModule],
  templateUrl: './expansion-backlog-item.component.html',
  styleUrl: './expansion-backlog-item.component.css',
})
export class ExpansionBacklogItemComponent {
  readonly panelOpenState = signal<boolean>(false);
  readonly item = input<BacklogItem>();
  onDelete = output<void>();
}
