import type Todo from "./lib/TodoDetail.svelte";

/**Implementation for getting, adding, updating, and removing Todos. */
abstract class TodoFetcher {
  abstract getTodos(): Promise<Todo[]>;
  abstract addTodo(todo: Todo): Promise<Todo>;
  abstract updateTodo(todo: Todo): Promise<Todo>;
  abstract removeTodo(id: number): Promise<void>;
}
