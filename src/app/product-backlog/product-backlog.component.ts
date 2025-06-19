import { Component, inject, signal } from '@angular/core';
import { BacklogItem } from '../shared/models/backlog-item';
import { ProductBacklogService } from './services/product-backlog/product-backlog.service';

@Component({
  selector: 'app-product-backlog',
  imports: [],
  templateUrl: './product-backlog.component.html',
  styleUrl: './product-backlog.component.css',
})
export class ProductBacklogComponent {
  items = signal<BacklogItem[]>([]);

  productBacklogService = inject(ProductBacklogService);

  ngOnInit(): void {
    this.items.set(this.productBacklogService.getItems());
  }
}
