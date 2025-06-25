import { Injectable, signal } from '@angular/core';
import { BacklogItem } from '../../shared/models/backlog-item';
import { DataSource } from '../../shared/datasource/datasource';

@Injectable({
  providedIn: 'root',
})
export class ProductBacklogService {
  backlogItems = signal<BacklogItem[]>([]);

  constructor(private dataSource: DataSource) {
    this.loadItems();
  }

  async loadItems(): Promise<void> {
    const items = await this.dataSource.getProductBacklogItems();
    this.backlogItems.set(items);
  }

  getItems(): BacklogItem[] {
    return this.backlogItems();
  }

  async addItem(item: BacklogItem): Promise<void> {
    this.backlogItems.update(previous => {
      const newItems = [...previous];
      const lastPriorityIndex = newItems.length > 0 ? newItems[newItems.length - 1].priority : -1;

      if (lastPriorityIndex < item.priority) {
        // If the new item's priority is higher than the last item's priority, add at the end
        newItems.push(item);
      } else {
        // Find the last index of items with the same priority
        const lastSamePriorityIndex = newItems.reduce((maxIndex, existingItem, index) => {
          return existingItem.priority === item.priority && index > maxIndex ? index : maxIndex;
        }, -1);

        // Insert after the last item with the same priority
        newItems.splice(lastSamePriorityIndex + 1, 0, item);
      }

      return newItems;
    });

    await this.dataSource.saveProductBacklogItems(this.backlogItems());
  }

  async moveItem(previousIndex: number, currentIndex: number): Promise<void> {
    this.backlogItems.update(previous => {
      const newItems = [...previous];
      const movedItem = newItems[previousIndex];
      const movedItemPriority = movedItem.priority;

      // Filter items by the moved item's priority
      const priorityItems = newItems.filter(item => item.priority === movedItemPriority);

      // Find the indices of priority items within the original array
      const priorityIndices = priorityItems.map(item => newItems.indexOf(item));

      // Ensure currentIndex is within the priority range
      const adjustedCurrentIndex = Math.max(
        Math.min(currentIndex, priorityIndices[priorityIndices.length - 1]),
        priorityIndices[0],
      );

      // Remove the moved item
      newItems.splice(previousIndex, 1);
      // Insert the moved item at the adjusted position
      newItems.splice(adjustedCurrentIndex, 0, movedItem);

      return newItems;
    });

    await this.dataSource.saveProductBacklogItems(this.backlogItems());
  }
}
