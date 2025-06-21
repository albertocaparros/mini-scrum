import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionBacklogItemComponent } from './expansion-backlog-item.component';

describe('ExpansionBacklogItemComponent', () => {
  let component: ExpansionBacklogItemComponent;
  let fixture: ComponentFixture<ExpansionBacklogItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpansionBacklogItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpansionBacklogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
