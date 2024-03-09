<script lang="ts">
  import type { iTodo } from "./types";

  import Board from "./lib/Board.svelte";
  import TodoForm from "./lib/TodoForm.svelte";

  import Modal from "svelte-simple-modal";

  import sampledata from "./sampledata.json";
  import NavBar from "./lib/NavBar.svelte";

  let todos: iTodo[] = sampledata.todos;

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

<main>
  <div class="header">
    <NavBar />
  </div>
  <div class="board-container">
    <Modal>
      <Board
        title="Completed Tasks"
        todos={todos.filter((todo) => todo.completed === true)}
        {removeTodo}
        {editTodo}
      />
      <Board
        title="Current Tasks"
        todos={todos.filter((todo) => todo.completed === false)}
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
    /* height: 100vh; */
  }
</style>
