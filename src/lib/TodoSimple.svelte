<script lang="ts">
  import type { iTodo } from "../types";

  export let todo: iTodo
  export let removeTodo: (id: number) => void

  function deleteTodo(){
    removeTodo(todo.id)
  }
</script>

<div class="todo-container">
  <div class="title">{todo.title}</div>
  <button on:click={deleteTodo}>Delete</button>
</div>

<style>
  .todo-container {
    display: flex;
    flex-direction: row;
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    align-items: center;
    width: 400px;
  }
</style>