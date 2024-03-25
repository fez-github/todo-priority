<script lang="ts">
  import "./app.css";
  import type { iTodo } from "./types";

  import Board from "./lib/Board.svelte";
  import TodoForm from "./lib/TodoForm.svelte";

  import Modal from "svelte-simple-modal";

  import NavBar from "./lib/NavBar.svelte";
  import SearchBar from "./lib/SearchBar.svelte";
  import { LocalStorageFetcher } from "./localstoragefetch";
  import Calendar from "./lib/Calendar.svelte";

  const todoFetcher = new LocalStorageFetcher();

  let mode: "calendar" | "board" = "calendar";
  function toggleMode() {
    mode = mode === "calendar" ? "board" : "calendar";
  }

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
    console.log("Sorting!");
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

  function selectChange(e: Event) {
    let select = e.target as HTMLSelectElement;
    let value = select.value;

    sortTodos(value as "urgency" | "importance" | "time" | "reset");
  }
</script>

<main class="flex flex-col items-center">
  <NavBar />
  <SearchBar
    label="Tag Search"
    title="Filter tasks by tag."
    placeholder="Search tags..."
    submitValue={filterTodos}
  />
  <select id="select" on:change={selectChange}>
    <option value="reset">No Sort</option>
    <option value="urgency">Urgency</option>
    <option value="importance">Importance</option>
    <option value="time">Time</option>
  </select>
  <button type="button" on:click={() => sortTodos("urgency")}
    >Sort by Urgency</button
  >
  <button type="button" on:click={() => sortTodos("importance")}>
    Sort by Importance
  </button>
  <button type="button" on:click={() => sortTodos("time")}>Sort by Time</button>
  <button type="button" on:click={() => sortTodos("reset")}>Reset</button>
  <button type="button" on:click={toggleMode}>Mode Shift</button>

  {#if mode === "calendar"}
    <Modal>
      <Calendar
        {editTodo}
        timedTodos={filteredTodos.filter((todo) => todo.dueDate)}
      />
    </Modal>
  {:else}
    <div class="flex flex-row self-start">
      <Modal>
        <Board
          title="Inactive Tasks"
          todos={filteredTodos.filter(
            (todo) =>
              todo.completed === false && !todo.startDate && !todo.dueDate
          )}
          {removeTodo}
          {editTodo}
        />
        <Board
          title="Current Tasks"
          todos={filteredTodos.filter(
            (todo) =>
              todo.completed === false && (todo.startDate || todo.dueDate)
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
  {/if}
  <Modal>
    <div>
      <TodoForm onSubmit={addTodo} />
    </div>
  </Modal>
</main>
