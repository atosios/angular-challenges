import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo.model';
import { selectTodoProcessing } from '../state/todos.selectors';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="main-container">
      <div class="actions-container">
        @if (!(todosProcessing$ | async)?.includes(todo)) {
          <button class="update-button" (click)="onUpdate()">Update</button>
          <button class="delete-button" (click)="onDelete()">Delete</button>
        } @else {
          <button class="update-button" disabled>Update</button>
          <button class="delete-button" disabled>Delete</button>
        }
      </div>
      <div class="title-container">
        @if ((todosProcessing$ | async)?.includes(todo)) {
          <div class="indicator-container">
            <mat-progress-spinner
              mode="indeterminate"
              color="primary"
              [diameter]="24">
              >
            </mat-progress-spinner>
          </div>
        }
        {{ todo.title }}
      </div>
    </div>
  `,
  styles: [
    '.main-container { width: 100%; display: flex; justify-content: flex-start; align-items: center; gap: 8px; }',
    '.title-container { width: 100%; height:100%; display: flex; justify-content: flex-start; align-items: center; gap: 8px; }',
    '.actions-container { width: 150px; height: 100%; display: flex; justify-content: center; align-items: center; gap: 4px; }',
    '.indicator-container {width: 24px; height: 100%;}',
  ],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() updateEvent = new EventEmitter<Todo>();
  @Output() deleteEvent = new EventEmitter<Todo>();

  todosProcessing$: Observable<Todo[] | undefined> =
    this.store.select(selectTodoProcessing);

  constructor(private store: Store) {
    return;
  }

  onUpdate() {
    this.updateEvent.emit(this.todo);
  }

  onDelete() {
    this.deleteEvent.emit(this.todo);
  }
}
