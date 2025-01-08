import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../model/todo.model';
import { FetchTodosError } from '../service/error-handler.service';

export const TodosActions = createActionGroup({
  source: 'Todos',
  events: {
    'Fetch Todos': emptyProps(),
    'Fetch Todos Success': props<{ todos: Todo[] }>(),
    'Fetch Todos Failure': props<{ error: FetchTodosError }>(),
    'Update Todo': props<{ todo: Todo }>(),
    'Update Todo Success': props<{ todo: Todo }>(),
    'Update Todo Failure': props<{ todo: Todo }>(),
    'Delete Todo': props<{ todo: Todo }>(),
  },
});
