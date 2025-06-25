import { Component, inject } from '@angular/core';
import { ExpansionBacklogItemComponent } from '../shared/expansion-backlog-item/expansion-backlog-item.component';
import { ProductBacklogService } from '../product-backlog/services/product-backlog.service';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { SprintBacklogService } from './services/sprint-backlog.service';

@Component({
  selector: 'app-sprint-backlog',
  imports: [ExpansionBacklogItemComponent, CdkDropList, CdkDrag],
  templateUrl: './sprint-backlog.component.html',
  styleUrl: './sprint-backlog.component.css',
})
export class SprintBacklogComponent {
  sprintBacklogService = inject(SprintBacklogService);
  items = this.sprintBacklogService.backlogItems;

  drop(event: CdkDragDrop<string[]>) {
    this.sprintBacklogService.moveItem(event.previousIndex, event.currentIndex);
  }
}
