import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  handleError(error: Error): void {
    if (error instanceof DeleteTodoError) {
      this.handleDeleteError(error);
    } else if (error instanceof UpdateTodoError) {
      this.handleUpdateError(error);
    } else if (error instanceof FetchTodosError) {
      this.handleFetchError(error);
    }
  }

  private handleDeleteError(error: Error): void {
    console.error('An error occurred while deleting the todo:', error);
  }

  private handleUpdateError(error: Error): void {
    console.error('An error occurred while updating the todo:', error);
  }

  private handleFetchError(error: Error): void {
    console.error('An error occurred while fetching the todos:', error);
  }
}

export class DeleteTodoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DeleteTodoError';
  }
}

export class UpdateTodoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UpdateTodoError';
  }
}

export class FetchTodosError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FetchTodosError';
  }
}
