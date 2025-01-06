import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodosManagerService {
  todos = signal<Todo[]>([]);

  constructor(private http: HttpClient) {
    this.fetch();
  }

  fetch() {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this.todos.set(todos);
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
      .subscribe((todoUpdated: Todo) => {
        // Ensure updated todo is reflected in the backend
        this.todos.set(
          this.todos().map((t) => (t.id === todoUpdated.id ? todoUpdated : t)),
        );
      });
  }

  public getTodosSignal() {
    return this.todos;
  }
}
