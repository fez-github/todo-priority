import type Todo from "./lib/TodoDetail.svelte";
import type { iTodo } from "./types";

/**Implementation for getting, adding, updating, and removing Todos. */
abstract class TodoFetcher {
  abstract getTodos(): Promise<iTodo[]>;
  abstract addTodo(todo: iTodo): Promise<iTodo>;
  abstract updateTodo(todo: iTodo): Promise<iTodo>;
  abstract removeTodo(id: number): Promise<void>;
}
