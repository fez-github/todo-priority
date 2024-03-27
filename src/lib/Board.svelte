<!--Container for holding tasks.-->
<script lang="ts">
  import type { iTodo } from "../types";
  import TodoBoard from "./TodoBoard.svelte";

  export let todos: iTodo[];
  export let removeTodo: (id: number) => void;
  export let editTodo: (todo: iTodo) => void;

  export let title: string = "Default Title";
</script>

<div class="todo-board">
  <h3>{title}</h3>
  <div class="todo-container">
    {#each todos as todo}
      <TodoBoard {todo} {removeTodo} {editTodo} />
    {/each}
  </div>
</div>

<style>
  .todo-board {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 10px;
    margin: 10px;

    border-radius: 5px;
    align-items: center;
    width: 400px;
    height: 700px;

    overflow-y: scroll;
  }
</style>
