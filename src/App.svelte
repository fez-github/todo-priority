<script lang="ts">
  import "./app.css";
  import type { iTodo } from "./types";

  import Board from "./lib/Board.svelte";
  import TodoForm from "./lib/TodoForm.svelte";

  import Modal from "svelte-simple-modal";

  import NavBar from "./lib/NavBar.svelte";
  import SearchBar from "./lib/SearchBar.svelte";
  import { LocalStorageFetcher } from "./localstoragefetch";

  const todoFetcher = new LocalStorageFetcher();

  let todos: iTodo[] = todoFetcher.initializeTodos();
  let filteredTodos: iTodo[] = todos;

  $: {
    filteredTodos = todos;
  }

  function filterTodos(str: string) {
    if (!str) {
      filteredTodos = todos;
      return;
    }

    filteredTodos = todos.filter((todo) => {
      if (!todo.tags) return false;
      let hasMatch: boolean = false;

      //Use Regex to check for any words that start with the search string.
      for (let tag of todo.tags) {
        if (tag.toLowerCase().match(new RegExp(`^${str}`))) {
          hasMatch = true;
          break;
        }
      }
      return hasMatch;
    });
  }

  function sortTodos(priority: "urgency" | "importance" | "time" | "reset") {
    if (priority === "urgency") {
      todos = [...todos.sort((a, b) => a.urgency - b.urgency)];
    }
    if (priority === "importance") {
      todos = [...todos.sort((a, b) => a.importance - b.importance)];
    }
    if (priority === "time") {
      todos = [...todos.sort((a, b) => a.time - b.time)];
    }
    if (priority === "reset") {
      todos = [...todos.sort((a, b) => a.id - b.id)];
    }
  }

  function addTodo(todo: iTodo) {
    todos = [...todos, todo];
    todoFetcher.addTodo(todo);
  }

  function removeTodo(id: number) {
    todos = todos.filter((todo) => todo.id !== id);
    todoFetcher.removeTodo(id);
  }

  function editTodo(todo: iTodo) {
    todos = todos.map((t) => (t.id === todo.id ? todo : t));
    todoFetcher.updateTodo(todo);
  }
</script>

<main class="main-layout">
  <NavBar />
  <SearchBar
    label="Tag Search"
    title="Filter tasks by tag."
    placeholder="Search tags..."
    submitValue={filterTodos}
  />
  <button type="button" on:click={() => sortTodos("urgency")}
    >Sort by Urgency</button
  >
  <button type="button" on:click={() => sortTodos("importance")}>
    Sort by Importance
  </button>
  <button type="button" on:click={() => sortTodos("time")}>Sort by Time</button>
  <button type="button" on:click={() => sortTodos("reset")}>Reset</button>

  <div class="board-container">
    <Modal>
      <Board
        title="Inactive Tasks"
        todos={filteredTodos.filter(
          (todo) => todo.completed === false && !todo.startDate && !todo.dueDate
        )}
        {removeTodo}
        {editTodo}
      />
      <Board
        title="Current Tasks"
        todos={filteredTodos.filter(
          (todo) => todo.completed === false && (todo.startDate || todo.dueDate)
        )}
        {removeTodo}
        {editTodo}
      />
      <Board
        title="Completed Tasks"
        todos={filteredTodos.filter((todo) => todo.completed === true)}
        {removeTodo}
        {editTodo}
      />
    </Modal>
  </div>
  <Modal>
    <div>
    <TodoForm onSubmit={addTodo} />
    </div>
  </Modal>
</main>

<style>
  .board-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .main-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
