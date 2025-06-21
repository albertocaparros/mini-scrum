import { Injectable } from '@angular/core';
import { BacklogItem } from '../../../shared/models/backlog-item';

@Injectable({
  providedIn: 'root',
})
export class ProductBacklogService {
  private backlogItems: BacklogItem[] = [
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
      priority: 3,
    },
    {
      id: 4,
      title: 'Enhance search functionality',
      as: 'User',
      want: 'to search for items using keywords',
      so: 'that they can find relevant information quickly',
      requirements: ['Add keyword search', 'Improve search accuracy'],
      priority: 4,
    },
    {
      id: 5,
      title: 'Update project documentation',
      as: 'Technical Writer',
      want: 'to update the project documentation',
      so: 'that the team has accurate and up-to-date information',
      requirements: ['Review current documentation', 'Add new features'],
      priority: 5,
    },
  ];

  getItems(): BacklogItem[] {
    return this.backlogItems;
  }

  addItem(item: BacklogItem): void {
    this.backlogItems.push(item);
  }
}
