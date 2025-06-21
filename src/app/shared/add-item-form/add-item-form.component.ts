import { Component, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BacklogItem } from '../models/backlog-item';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-item-form',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './add-item-form.component.html',
  styleUrl: './add-item-form.component.css',
})
export class AddItemFormComponent {
  form: FormGroup;
  private backlogItemId = 0;

  onItemAdd = output<BacklogItem>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      as: [''],
      want: [''],
      so: [''],
      requirements: [''],
      priority: [1, [Validators.min(1), Validators.max(10), Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const newItem: BacklogItem = {
        id: this.backlogItemId++,
        title: formValue.title,
        as: formValue.as || undefined,
        want: formValue.want || undefined,
        so: formValue.so || undefined,
        requirements: formValue.requirements
          ? formValue.requirements.split(',').map((req: string) => req.trim())
          : undefined,
        priority: formValue.priority || undefined,
      };

      this.onItemAdd.emit(newItem);
      this.form.reset();
    }
  }
}
