import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ProductBacklogComponent } from './product-backlog/product-backlog.component';

@Component({
  selector: 'app-root',
  imports: [ProductBacklogComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
