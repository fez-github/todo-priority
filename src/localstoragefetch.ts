import type { TodoFetcher } from "./fetcher";
import type { iTodo } from "./types";

import sampledata from "./sampledata.json";

/**Fetch and store Todos in localStorage. */
export class LocalStorageFetcher implements TodoFetcher {
  getTodos(): Promise<iTodo[]> {
    const todos = JSON.parse(
      localStorage.getItem("todo-priority-eisenhower") || "[]"
    );
    return Promise.resolve(todos);
  }
  addTodo(todo: iTodo): Promise<iTodo> {
    const todos = JSON.parse(
      localStorage.getItem("todo-priority-eisenhower") || "[]"
    );
    todos.push(todo);
    localStorage.setItem("todo-priority-eisenhower", JSON.stringify(todos));
    return Promise.resolve(todo);
  }
  updateTodo(todo: iTodo): Promise<iTodo> {
    const todos = JSON.parse(
      localStorage.getItem("todo-priority-eisenhower") || "[]"
    );
    const index = todos.findIndex((t: iTodo) => t.id === todo.id);
    todos[index] = todo;
    localStorage.setItem("todo-priority-eisenhower", JSON.stringify(todos));
    return Promise.resolve(todo);
  }
  removeTodo(id: number): Promise<iTodo> {
    const todos = JSON.parse(
      localStorage.getItem("todo-priority-eisenhower") || "[]"
    );
    const index = todos.findIndex((t: iTodo) => t.id === id);
    const todo = todos[index];

    todos.splice(index, 1);
    localStorage.setItem("todo-priority-eisenhower", JSON.stringify(todos));
    return Promise.resolve(todo);
  }
  initializeTodos(): iTodo[] {
    const localTodos = JSON.parse(
      localStorage.getItem("todo-priority-eisenhower") || "[]"
    );

    if (localTodos.length === 0) {
      localStorage.setItem(
        "todo-priority-eisenhower",
        JSON.stringify(sampledata.todos)
      );
      return sampledata.todos;
    }
    return localTodos;
  }
}
