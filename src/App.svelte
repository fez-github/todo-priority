<script lang="ts">
  import type { iTodo } from "./types";

  import Board from "./lib/Board.svelte";
  import TodoForm from "./lib/TodoForm.svelte";

  import Modal from "svelte-simple-modal";

  import sampledata from "./sampledata.json";
  import NavBar from "./lib/NavBar.svelte";
  import SearchBar from "./lib/SearchBar.svelte";

  let todos: iTodo[] = sampledata.todos;
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

      for (let tag of todo.tags) {
        if (tag.toLowerCase().match(new RegExp(`^${str}`))) {
          hasMatch = true;
          break;
        }
      }
      return hasMatch;
    });
  }

  function addTodo(todo: iTodo) {
    todos = [...todos, todo];
    console.log({ todos });
  }

  function removeTodo(id: number) {
    todos = todos.filter((todo) => todo.id !== id);
  }

  function editTodo(todo: iTodo) {
    todos = todos.map((t) => (t.id === todo.id ? todo : t));
  }
</script>

<main class="main-layout">
  <!-- <div class="header"> -->
    <NavBar />
  <!-- </div> -->
  <SearchBar
    label="Tag Search"
    title="Filter tasks by tag."
    submitValue={filterTodos}
  />
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
  <TodoForm onSubmit={addTodo} />
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
