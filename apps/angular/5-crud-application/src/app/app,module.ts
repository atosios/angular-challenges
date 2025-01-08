import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { todosReducer } from './state/todos.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({
      todos: todosReducer,
      loading: todosReducer,
      todosState: todosReducer,
    }),
  ],
})
export class AppModule {}
