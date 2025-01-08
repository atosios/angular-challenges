import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todos.reducer';

export const selectTodosState = createFeatureSelector<TodosState>('todosState');

export const selectTodos = createSelector(
  selectTodosState,
  (state: TodosState) => state.todos,
);

export const selectLoading = createSelector(
  selectTodosState,
  (state: TodosState) => state.fetching,
);

export const selectUpdating = createSelector(
  selectTodosState,
  (state: TodosState) => state.updating,
);

export const selectTodoProcessing = createSelector(
  selectTodosState,
  (state: TodosState) => state.todosProcessing,
);
