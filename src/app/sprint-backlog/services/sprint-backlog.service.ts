import { Injectable } from '@angular/core';
import { BacklogServiceBase } from '../../shared/backlog-base/backlog-base.service';
import { DataSource } from '../../shared/datasource/datasource';
import { BacklogItem } from '../../shared/models/backlog-item';

@Injectable({ providedIn: 'root' })
export class SprintBacklogService extends BacklogServiceBase {
  constructor(private dataSource: DataSource) {
    super();
    this.loadItems();
  }

  async loadItems(): Promise<void> {
    const items = await this.dataSource.getSprintBacklogItems();
    this.backlogItems.set(items);
  }

  override async addItem(item: BacklogItem): Promise<void> {
    super.addItem(item);
    await this.dataSource.saveSprintBacklogItems(this.backlogItems());
  }

  override async moveItem(previousIndex: number, currentIndex: number): Promise<void> {
    super.moveItem(previousIndex, currentIndex);
    await this.dataSource.saveSprintBacklogItems(this.backlogItems());
  }

  override async removeItem(item: BacklogItem): Promise<void> {
    super.removeItem(item);
    await this.dataSource.saveSprintBacklogItems(this.backlogItems());
  }
}
