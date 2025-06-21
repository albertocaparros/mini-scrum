import { Injectable, signal } from '@angular/core';
import { BacklogItem } from '../../../shared/models/backlog-item';

@Injectable({
  providedIn: 'root',
})
export class ProductBacklogService {
  backlogItems = signal<BacklogItem[]>([
    {
      id: 1,
      title: 'Add new user story',
      as: 'Product Owner',
      want: 'to add a new user story to the product backlog',
      so: 'that the development team can prioritize and plan it',
      requirements: ['Must include title', 'Must include description'],
      priority: 1,
    },
    {
      id: 2,
      title: 'Implement login functionality',
      as: 'Developer',
      want: 'to implement a secure login system',
      so: 'that users can access their accounts',
      requirements: ['Use OAuth 2.0', 'Implement password hashing'],
      priority: 2,
    },
    {
      id: 3,
      title: 'Fix dashboard loading issue',
      want: 'to resolve the dashboard loading error',
      so: 'that users can access the dashboard without delays',
      requirements: ['Identify the root cause', 'Update error handling'],
      priority: 2,
    },
    {
      id: 4,
      title: 'Enhance search functionality',
      as: 'User',
      want: 'to search for items using keywords',
      so: 'that they can find relevant information quickly',
      requirements: ['Add keyword search', 'Improve search accuracy'],
      priority: 3,
    },
    {
      id: 5,
      title: 'Update project documentation',
      as: 'Technical Writer',
      want: 'to update the project documentation',
      so: 'that the team has accurate and up-to-date information',
      requirements: ['Review current documentation', 'Add new features'],
      priority: 3,
    },
  ]);

  getItems(): BacklogItem[] {
    return this.backlogItems();
  }

  addItem(item: BacklogItem): void {
    this.backlogItems.update(previous => {
      const newItems = [...previous];
      const priorityItems = newItems.filter(
        existingItem => existingItem.priority === item.priority,
      );
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
  }

  moveItem(previousIndex: number, currentIndex: number): void {
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
  }
}
