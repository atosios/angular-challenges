import { createReducer, on } from '@ngrx/store';
import { Todo } from '../model/todo.model';
import { TodosActions } from './todos.actions';

export interface TodosState {
  todos: Todo[];
  fetching: boolean;
  updating: boolean;
  todosProcessing?: Todo[];
  error?: Error;
}

export const initialState: TodosState = {
  todos: [],
  fetching: false,
  updating: false,
  todosProcessing: undefined,
  error: undefined,
};

export const todosReducer = createReducer(
  initialState,
  // Fetching Todos
  on(TodosActions.fetchTodos, (state) => ({
    ...state,
    fetching: true,
  })),
  on(TodosActions.fetchTodosSuccess, (state, { todos }) => ({
    ...state,
    todos: todos,
    fetching: false,
  })),
  on(TodosActions.fetchTodosFailure, (state) => ({
    ...state,
    fetching: false,
  })),
  // Updating Todos
  on(TodosActions.updateTodo, (state, { todo }) => ({
    ...state,
    updating: true,
    todosProcessing: state.todosProcessing
      ? [...state.todosProcessing, todo]
      : [todo],
  })),
  on(TodosActions.updateTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
    todosProcessing: state.todosProcessing
      ? state.todosProcessing.filter((t) => t.id !== todo.id)
      : undefined,
    updating: state.todosProcessing ? true : false,
  })),
  on(TodosActions.updateTodoFailure, (state, { todo }) => ({
    ...state,
    updating: false,
    todosProcessing: state.todosProcessing
      ? state.todosProcessing.filter((t) => t.id !== todo.id)
      : undefined,
  })),
  // Deleting Todos
  on(TodosActions.deleteTodo, (state, { todo }) => ({
    ...state,
    todos: state.todos.filter((t) => t.id !== todo.id),
  })),
);
