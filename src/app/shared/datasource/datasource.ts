import { Injectable } from '@angular/core';
import { BacklogItem } from '../../shared/models/backlog-item';

const PRDOUCT_BACKLOG_STORAGE_KEY = 'product-backlog-items';

@Injectable({ providedIn: 'root' })
export class DataSource {
  getProductBacklogItems(): Promise<BacklogItem[]> {
    return new Promise(resolve => {
      const data = localStorage.getItem(PRDOUCT_BACKLOG_STORAGE_KEY);
      if (data) {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve([]);
        }
      }
      resolve([]);
    });
  }

  saveProductBacklogItems(items: BacklogItem[]): Promise<void> {
    return new Promise(resolve => {
      localStorage.setItem(PRDOUCT_BACKLOG_STORAGE_KEY, JSON.stringify(items));
      resolve();
    });
  }

  getSprintBacklogItems(): Promise<BacklogItem[]> {
    return new Promise(resolve => {
      const data = localStorage.getItem('sprint-backlog-items');
      if (data) {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve([]);
        }
      }
      resolve([]);
    });
  }

  saveSprintBacklogItems(items: BacklogItem[]): Promise<void> {
    return new Promise(resolve => {
      localStorage.setItem('sprint-backlog-items', JSON.stringify(items));
      resolve();
    });
  }
}
