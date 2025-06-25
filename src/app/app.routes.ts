import { Routes } from '@angular/router';
import { ProductBacklogComponent } from './product-backlog/product-backlog.component';
import { SprintBacklogComponent } from './sprint-backlog/sprint-backlog.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductBacklogComponent,
  },
  {
    path: 'sprint',
    component: SprintBacklogComponent,
  },
];
