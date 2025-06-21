import { Component, input, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { BacklogItem } from '../models/backlog-item';

@Component({
  selector: 'app-expansion-backlog-item',
  imports: [MatExpansionModule],
  templateUrl: './expansion-backlog-item.component.html',
  styleUrl: './expansion-backlog-item.component.css',
})
export class ExpansionBacklogItemComponent {
  readonly panelOpenState = signal<boolean>(false);
  readonly item = input<BacklogItem>();
}
