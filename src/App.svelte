<script lang="ts">
  import "./app.css";
  import type { iTodo } from "./types";

  import Board from "./lib/Board.svelte";
  import TodoForm from "./lib/TodoForm.svelte";

  import Modal from "svelte-simple-modal";

  import SearchBar from "./lib/SearchBar.svelte";
  import { LocalStorageFetcher } from "./localstoragefetch";
  import Calendar from "./lib/Calendar.svelte";
  import openForm from "./lib/TodoOpener.svelte";
  import TodoOpener from "./lib/TodoOpener.svelte";

  const todoFetcher = new LocalStorageFetcher();

  let mode: "calendar" | "board" = "board";
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

    str = str.toLowerCase();

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

  function sortTodos(
    priority: "urgency" | "importance" | "time" | "reset" | "title"
  ) {
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
    if (priority === "title") {
      todos = [...todos.sort((a, b) => a.title.localeCompare(b.title))];
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
  <div
    class="flex text-lg justify-around bg-black text-white p-2.5 sticky top-0 z-10 w-full"
  >
    <button class="text-lg w-[89.05px]" type="button" on:click={toggleMode}
      >{#if mode === "board"}Calendar{:else}Board{/if}</button
    >
    <SearchBar
      label="Tag Filter"
      title="Filter tasks by tag."
      placeholder="Search tags..."
      submitValue={filterTodos}
    />
    <label
      >Task Sort: <select id="select" on:change={selectChange}>
        <option value="reset">Sort By...</option>
        <option value="title">Sort By Title</option>
        <option value="urgency">Sort By Urgency</option>
        <option value="importance">Sort by Importance</option>
        <option value="time">Sort by Time</option>
      </select></label
    >
    <Modal>
      <TodoOpener {addTodo} newForm={true} />
    </Modal>
  </div>

  {#if mode === "calendar"}
    <Modal>
      <Calendar
        {editTodo}
        todos={filteredTodos.filter((todo) => todo.dueDate)}
      />
    </Modal>
  {:else}
    <div class="flex flex-row self-start w-full">
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
</main>
