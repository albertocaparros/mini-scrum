import { TestBed } from '@angular/core/testing';
import { ProductBacklogService } from './product-backlog.service';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { BacklogItem } from '../../shared/models/backlog-item';
import { DataSource } from '../../shared/datasource/datasource';

const mockDataSource = {
  getProductBacklogItems: vi.fn().mockResolvedValue([]),
  saveProductBacklogItems: vi.fn().mockResolvedValue(undefined),
};

describe('ProductBacklogService', () => {
  let service: ProductBacklogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DataSource, useValue: mockDataSource }],
    });
    service = TestBed.inject(ProductBacklogService);

    service.backlogItems.set([]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty backlog', () => {
    expect(service.backlogItems().length).toBe(0);
  });

  it('should add an item to the backlog', () => {
    const newItem: BacklogItem = { id: 1, title: 'Test Item', priority: 3 };

    service.addItem(newItem);

    expect(service.backlogItems().length).toBe(1);
    expect(service.backlogItems()[0]).toEqual(newItem);
  });

  it('should add the items maintaining order within the same priority', () => {
    const item1: BacklogItem = { id: 1, title: 'Item 1', priority: 2 };
    const item2: BacklogItem = { id: 2, title: 'Item 2', priority: 2 };
    const item3: BacklogItem = { id: 3, title: 'Item 3', priority: 3 };

    service.addItem(item1);
    service.addItem(item3);
    service.addItem(item2);

    expect(service.backlogItems().length).toBe(3);
    expect(service.backlogItems()[0]).toEqual(item1);
    expect(service.backlogItems()[1]).toEqual(item2);
    expect(service.backlogItems()[2]).toEqual(item3);
  });

  it('should move an item within the same priority group', () => {
    const item1: BacklogItem = { id: 1, title: 'Item 1', priority: 2 };
    const item2: BacklogItem = { id: 2, title: 'Item 2', priority: 2 };
    const item3: BacklogItem = { id: 3, title: 'Item 3', priority: 3 };

    service.addItem(item1);
    service.addItem(item2);
    service.addItem(item3);
    service.moveItem(0, 1);

    expect(service.backlogItems()[0]).toEqual(item2);
    expect(service.backlogItems()[1]).toEqual(item1);
    expect(service.backlogItems()[2]).toEqual(item3);
  });

  it('should load items from the data source on initialization', async () => {
    const items: BacklogItem[] = [
      { id: 1, title: 'Loaded Item 1', priority: 1 },
      { id: 2, title: 'Loaded Item 2', priority: 2 },
    ];
    mockDataSource.getProductBacklogItems.mockResolvedValueOnce(items);

    await service.loadItems();

    expect(mockDataSource.getProductBacklogItems).toHaveBeenCalled();
    expect(service.backlogItems()).toEqual(items);
  });

  it('should save persistence of items when adding', async () => {
    const item1: BacklogItem = { id: 1, title: 'Item 1', priority: 2 };

    await service.addItem(item1);

    expect(mockDataSource.saveProductBacklogItems).toHaveBeenCalledWith([item1]);
  });

  it('should maintain persistence of items when moving', async () => {
    const item1: BacklogItem = { id: 1, title: 'Item 1', priority: 2 };
    const item2: BacklogItem = { id: 2, title: 'Item 2', priority: 2 };
    const item3: BacklogItem = { id: 3, title: 'Item 3', priority: 3 };

    await service.addItem(item1);
    await service.addItem(item2);
    await service.addItem(item3);
    await service.moveItem(0, 1);

    expect(mockDataSource.saveProductBacklogItems).toHaveBeenCalledWith([item2, item1, item3]);
  });
});
