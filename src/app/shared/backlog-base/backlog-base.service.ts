import { signal } from '@angular/core';
import { BacklogItem } from '../models/backlog-item';

export abstract class BacklogServiceBase {
  backlogItems = signal<BacklogItem[]>([]);

  getItems(): BacklogItem[] {
    return this.backlogItems();
  }

  addItem(item: BacklogItem): void | Promise<void> {
    item.id = this.backlogItems().length + 2;
    this.backlogItems.update(previous => [...previous, item]);
  }

  moveItem(previousIndex: number, currentIndex: number): void | Promise<void> {
    const items = this.backlogItems();
    const itemToMove = items[previousIndex];
    const updatedItems = [...items];
    updatedItems.splice(previousIndex, 1);
    updatedItems.splice(currentIndex, 0, itemToMove);
    this.backlogItems.set(updatedItems);
  }

  removeItem(item: BacklogItem): void | Promise<void> {
    this.backlogItems.update(previous => previous.filter(i => i.id !== item.id));
  }
}
