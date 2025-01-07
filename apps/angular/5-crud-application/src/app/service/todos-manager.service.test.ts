import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Todo } from '../model/todo.model';
import { TodosManagerService } from './todos-manager.service';

describe('TodosManagerService', () => {
  let todosManagerService: TodosManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), TodosManagerService],
    });

    todosManagerService = TestBed.inject(TodosManagerService);
  });

  let fetchedTodos: Todo[] = [];

  it('should fetch todos', (done) => {
    todosManagerService.fetch().subscribe((todos) => {
      fetchedTodos = todos;
      expect(todos.length).toBe(200);
      expect(todos[0].id).toBe(1);
      expect(todos[0].title).toBe('delectus aut autem');
      done();
    });
  });

  it('should update todo', (done) => {
    const todoToUpdate = fetchedTodos[0];
    const updatedTitle = 'updated title';

    todosManagerService.update(todoToUpdate).subscribe({
      next: (updatedTodo) => {
        expect(updatedTodo.title).toBe(updatedTitle);
        done();
      },
      error: (error) => {
        done.fail(error);
      },
    });
  });

  it('should delete todo', (done) => {
    const todoToDelete = fetchedTodos[0];

    todosManagerService.delete(todoToDelete).subscribe({
      next: (deletedTodo) => {
        expect(deletedTodo).toBe(todoToDelete);
        done();
      },
      error: (error) => {
        done.fail(error);
      },
    });
  });
});
