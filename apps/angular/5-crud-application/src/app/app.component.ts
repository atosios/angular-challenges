import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppModule } from './app,module';
import { TodoItemComponent } from './components/todo-item.component';
import { Todo } from './model/todo.model';
import { TodosService } from './service/todos.service';
import { TodosActions } from './state/todos.actions';
import { selectLoading, selectTodos } from './state/todos.selectors';

@Component({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    AppModule,
    TodoItemComponent,
  ],
  selector: 'app-root',
  template: `
    <div class="main-container">
      @if (loading$ | async) {
        <div class="spinner-container">
          <mat-progress-spinner
            mode="indeterminate"
            color="primary"></mat-progress-spinner>
        </div>
      }
      <div *ngFor="let todo of todos$ | async">
        <app-todo-item
          [todo]="todo"
          (updateEvent)="onUpdate($event)"
          (deleteEvent)="onDelete($event)"></app-todo-item>
      </div>
    </div>
  `,
  styles: [
    `
      .main-container {
        width: calc(100vw - 48px);
        height: auto;
        padding: 24px;

        display: flex;
        flex-direction: column;
      }

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
  todos$: Observable<Todo[]> = this.store.select(selectTodos);
  loading$: Observable<boolean> = this.store.select(selectLoading);

  onUpdate(todo: Todo) {
    this.store.dispatch(TodosActions.updateTodo({ todo: todo }));
    this.todosService
      .updateTodo(todo)
      .subscribe((todo) =>
        this.store.dispatch(TodosActions.updateTodoSuccess({ todo })),
      );
  }

  onDelete(todo: Todo) {
    this.store.dispatch(TodosActions.deleteTodo({ todo: todo }));
  }

  constructor(
    private todosService: TodosService,
    public store: Store<{ todos: Todo[] }>,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(TodosActions.fetchTodos());
    this.todosService.fetchTodos().subscribe({
      next: (todos) =>
        this.store.dispatch(TodosActions.fetchTodosSuccess({ todos })),
      error: (error) =>
        this.store.dispatch(TodosActions.fetchTodosFailure(error)),
    });
  }
}
