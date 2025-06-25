import { Injectable, signal } from '@angular/core';
import { BacklogItem } from '../../shared/models/backlog-item';

@Injectable({
  providedIn: 'root',
})
export class SprintBacklogService {
  backlogItems = signal<BacklogItem[]>([]);

  getItems(): BacklogItem[] {
    return this.backlogItems();
  }

  addItem(item: BacklogItem): void {
    this.backlogItems.update(previous => [...previous, item]);
  }

  moveItem(previousIndex: number, currentIndex: number): void {
    const items = this.backlogItems();
    const itemToMove = items[previousIndex];
    const updatedItems = [...items];
    updatedItems.splice(previousIndex, 1);
    updatedItems.splice(currentIndex, 0, itemToMove);
    this.backlogItems.set(updatedItems);
  }
}
