import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, OnInit } from '@angular/core';
import { Todo } from './model/todo.model';
import { TodosManagerService } from './service/todos-manager.service';

@Component({
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="updateTodo(todo)">Update</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos = computed(() => this.todosManager.getTodosSignal()());

  constructor(
    private http: HttpClient,
    private todosManager: TodosManagerService,
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
}
