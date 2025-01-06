import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Todo } from './model/todo.model';
import { TodosManagerService } from './service/todos-manager.service';

@Component({
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @if (todosManager.loading) {
      <div class="spinner-container">
        <mat-progress-spinner
          mode="indeterminate"
          color="primary"></mat-progress-spinner>
      </div>
    }
    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="updateTodo(todo)">Update</button>
      <button (click)="deleteTodo(todo)">Delete</button>
    </div>
  `,
  styles: [
    `
      .spinner-container {
        width: 100vw;
        height: 100vh;

        position: absolute;

        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  todos = computed(() => this.todosManager.getTodosSignal()());

  constructor(
    private http: HttpClient,
    public todosManager: TodosManagerService,
  ) {}

  ngOnInit(): void {
    return;
  }

  getTodos() {
    this.todosManager.fetch();
  }

  updateTodo(todo: Todo) {
    this.todosManager.update(todo);
  }

  deleteTodo(todo: Todo) {
    this.todosManager.delete(todo);
  }
}
