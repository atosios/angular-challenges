import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  fetchTodos(): Observable<Array<Todo>> {
    return (
      this.http
        .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
        // Make sure that an array (maybe empty) is returned in any case
        .pipe(map((todos) => todos || []))
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const updatedTodo: Todo = { ...todo, title: 'Updated' };

    return this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
        updatedTodo,
      )
      .pipe(map((updatedTodo) => updatedTodo || null));
  }
}
