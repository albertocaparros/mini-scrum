import { Component, inject, signal } from '@angular/core';
import { BacklogItem } from '../shared/models/backlog-item';
import { ProductBacklogService } from './services/product-backlog/product-backlog.service';
import { AddItemFormComponent } from '../shared/add-item-form/add-item-form.component';
import { ExpansionBacklogItemComponent } from '../shared/expansion-backlog-item/expansion-backlog-item.component';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-product-backlog',
  imports: [AddItemFormComponent, ExpansionBacklogItemComponent, CdkDropList, CdkDrag],
  templateUrl: './product-backlog.component.html',
  styleUrl: './product-backlog.component.css',
})
export class ProductBacklogComponent {
  productBacklogService = inject(ProductBacklogService);
  items = this.productBacklogService.backlogItems;

  drop(event: CdkDragDrop<string[]>) {
    this.productBacklogService.moveItem(event.previousIndex, event.currentIndex);
  }
}
