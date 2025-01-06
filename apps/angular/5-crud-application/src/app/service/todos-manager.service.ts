import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from '../model/todo.model';
import {
  DeleteTodoError,
  ErrorHandlerService,
  FetchTodosError,
  UpdateTodoError,
} from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class TodosManagerService {
  todos = signal<Todo[]>([]);

  loading = false;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) {
    this.fetch();
  }

  fetch() {
    this.loading = true;

    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (todos: Todo[]) => {
          this.todos.set(todos);
        },
        error: (error) => {
          // Handle the error here
          console.error('An error occurred while fetching the todos:', error);
          // Optionally, you can use the global error handler
          this.errorHandler.handleError(new FetchTodosError(error));
        },
        complete: () => {
          console.info('Todos fetched:', this.todos());
          this.loading = false;
        },
      });
  }

  update(todo: Todo) {
    // Quick local update
    const updatedTodo = { ...todo, title: randText() };
    this.todos.set(
      this.todos().map((t) => (t.id === updatedTodo.id ? updatedTodo : t)),
    );

    this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify(updatedTodo),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe({
        next: () => (todoUpdated: Todo) => {
          // Ensure updated todo is reflected in the backend
          this.todos.set(
            this.todos().map((t) =>
              t.id === todoUpdated.id ? todoUpdated : t,
            ),
          );
        },
        error: (error) => {
          // Handle the error here
          console.error('An error occurred while updating the todo:', error);
          // Optionally, you can use the global error handler
          this.errorHandler.handleError(new UpdateTodoError(error));
        },
        complete: () => {
          console.info('Todo updated\n', 'From:', todo, '\nTo:', updatedTodo);
        },
      });
  }

  delete(todo: Todo) {
    this.loading = true;

    this.http
      .delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
      .subscribe({
        next: () => {
          // Ensure deleted todo is reflected in the backend
          this.todos.set(this.todos().filter((t) => t.id !== todo.id));
        },
        error: (error) => {
          // Handle the error here
          console.error('An error occurred while deleting the todo:', error);
          // Optionally, you can use the global error handler
          this.errorHandler.handleError(new DeleteTodoError(error));
        },
        complete: () => {
          console.info('Todo deleted:', todo);
          this.loading = false;
        },
      });
  }

  public getTodosSignal() {
    return this.todos;
  }
}
