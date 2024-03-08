<script lang="ts">
  import type { iTodo } from "../types";

  export let todo: iTodo;
  export let removeTodo: (id: number) => void;
  export let editTodo: (todo: iTodo) => void;

  function deleteTodo() {
    removeTodo(todo.id);
  }

  function updateTodo(event: Event) {
    editTodo(todo);
  }
</script>

<div class="todo-container modal">
  <textarea class="title" on:change={updateTodo} bind:value={todo.title} />
  <div class="priorities">
    <input
      class="priority urgency"
      type="number"
      min="0"
      max="5"
      bind:value={todo.urgency}
    />
    <input
      class="priority importance"
      type="number"
      min="0"
      max="5"
      bind:value={todo.importance}
    />
    <input
      class="priority time"
      type="number"
      min="0"
      max="10"
      bind:value={todo.time}
    />
  </div>
  <textarea
    class="title description"
    on:change={updateTodo}
    bind:value={todo.description}
  />
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

  .priorities {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  .priority {
    border: 1px solid black;
    padding: 5px;
    border-radius: 5px;
  }
</style>
