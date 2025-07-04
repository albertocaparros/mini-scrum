import { Component, inject } from '@angular/core';
import { ExpansionBacklogItemComponent } from '../shared/expansion-backlog-item/expansion-backlog-item.component';
import { ProductBacklogService } from '../product-backlog/services/product-backlog.service';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { SprintBacklogService } from './services/sprint-backlog.service';
import { MatChipsModule } from '@angular/material/chips';
import { BacklogItem } from '../shared/models/backlog-item';

@Component({
  selector: 'app-sprint-backlog',
  imports: [ExpansionBacklogItemComponent, CdkDropList, CdkDrag, MatChipsModule],
  templateUrl: './sprint-backlog.component.html',
  styleUrl: './sprint-backlog.component.css',
})
export class SprintBacklogComponent {
  productBacklogService = inject(ProductBacklogService);
  sprintBacklogService = inject(SprintBacklogService);
  sprintItems = this.sprintBacklogService.backlogItems;
  productItems = this.productBacklogService.backlogItems;

  dropInSprint(event: CdkDragDrop<BacklogItem[]>) {
    if (event.previousContainer === event.container) {
      this.sprintBacklogService.moveItem(event.previousIndex, event.currentIndex);
    } else {
      const droppedItem: BacklogItem = event.previousContainer.data[event.previousIndex];
      this.sprintBacklogService.addItem(droppedItem);
      this.productBacklogService.removeItem(droppedItem);
    }
  }

  dropInProduct(event: CdkDragDrop<BacklogItem[]>) {
    if (event.previousContainer === event.container) {
      this.productBacklogService.moveItem(event.previousIndex, event.currentIndex);
    } else {
      const droppedItem: BacklogItem = event.previousContainer.data[event.previousIndex];
      this.productBacklogService.addItem(droppedItem);
      this.sprintBacklogService.removeItem(droppedItem);
    }
  }
}
