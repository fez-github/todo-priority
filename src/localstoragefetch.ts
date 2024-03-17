import type { TodoFetcher } from "./fetcher";
import type { iTodo } from "./types";

import sampledata from "./sampledata.json";

/**Fetch and store Todos in localStorage. */
export class LocalStorageFetcher implements TodoFetcher {
  getTodos(): Promise<iTodo[]> {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    return Promise.resolve(todos);
  }
  addTodo(todo: iTodo): Promise<iTodo> {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    return Promise.resolve(todo);
  }
  updateTodo(todo: iTodo): Promise<iTodo> {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    const index = todos.findIndex((t: iTodo) => t.id === todo.id);
    todos[index] = todo;
    localStorage.setItem("todos", JSON.stringify(todos));
    return Promise.resolve(todo);
  }
  removeTodo(id: number): Promise<void> {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    const index = todos.findIndex((t: iTodo) => t.id === id);
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    return Promise.resolve();
  }
  initializeTodos(): iTodo[] {
    const localTodos = JSON.parse(localStorage.getItem("todos") || "[]");

    if (localTodos.length === 0) {
      localStorage.setItem("todos", JSON.stringify(sampledata.todos));
      return sampledata.todos;
    }
    return localTodos;
  }
}
