import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
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
    this.fetch().subscribe();
  }

  fetch(): Observable<Todo[]> {
    this.loading = true;

    return new Observable<Todo[]>((observer) => {
      this.http
        .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
        .subscribe({
          next: (todos: Todo[]) => {
            this.todos.set(todos);
            observer.next(todos);
          },
          error: (error) => {
            this.errorHandler.handleError(new FetchTodosError(error));
            observer.error(error);
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
            observer.complete();
          },
        });
    });
  }

  update(todo: Todo): Observable<Todo> {
    // Quick local update
    const updatedTodo = { ...todo, title: 'updated title' };
    this.todos.set(
      this.todos().map((t) => (t.id === updatedTodo.id ? updatedTodo : t)),
    );

    return new Observable<Todo>((observer) => {
      this.http
        .put<Todo>(
          `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
          JSON.stringify(updatedTodo),
          {
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
          },
        )
        .subscribe({
          next: (todoUpdated: Todo) => {
            this.todos.set(
              this.todos().map((t) =>
                t.id === todoUpdated.id ? todoUpdated : t,
              ),
            );
            observer.next(todoUpdated);
            observer.complete();
          },
          error: (error) => {
            this.errorHandler.handleError(new UpdateTodoError(error));
            observer.error(error);
          },
        });
    });
  }

  delete(todo: Todo): Observable<Todo> {
    this.loading = true;

    return new Observable<Todo>((observer) => {
      this.http
        .delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
        .subscribe({
          next: () => {
            // Ensure deleted todo is reflected in the backend
            this.todos.set(this.todos().filter((t) => t.id !== todo.id));
            observer.next(todo);
            observer.complete();
          },
          error: (error) => {
            // Handle the error here
            console.error('An error occurred while deleting the todo:', error);
            // Optionally, you can use the global error handler
            this.errorHandler.handleError(new DeleteTodoError(error));
            observer.error(error);
          },
        });
    });
  }

  public getTodosSignal() {
    return this.todos;
  }
}
