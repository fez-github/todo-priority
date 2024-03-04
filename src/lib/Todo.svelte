<script lang="ts">
  import type { iTodo } from "../types";

  export let todo: iTodo
  export let removeTodo: (id: number) => void

  function deleteTodo(){
    console.log("Button clicked.")
    removeTodo(todo.id)
  }
</script>

<div class="todo-container">
  <div class="title">{todo.title}</div>
  <div class="priorities">
    <div class="priority urgency">{todo.urgency}</div>
    <div class="priority importance">{todo.importance}</div>
    <div class="priority time">{todo.time}</div>
  </div>
  <div class="description">{todo.description}</div>
  <p>Tags:</p>
  <ul>
    {#each todo.tags as tag}
    <li>{tag}</li>
    {/each}

  </ul>
  <p>Subtasks:</p>
  <ul>
    {#each todo.subtasks as subtask}
    <li>{subtask}</li>
    {/each}
  </ul>
  <button on:click={deleteTodo}>Delete</button>
</div>

<style>
  .todo-container {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    align-items: center;
  }
  .priorities{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  .priority{
    border: 1px solid black;
    padding: 5px;
    border-radius: 5px;
  }
</style>