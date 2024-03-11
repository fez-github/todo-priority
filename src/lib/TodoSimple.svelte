<script lang="ts">
  import type { iTodo } from "../types";

  import { getContext } from "svelte";
  import type { Context } from "svelte-simple-modal";
  import TodoForm from "./TodoForm.svelte";
  const { open } = getContext<Context>("simple-modal");

  export let todo: iTodo;
  export let removeTodo: (id: number) => void;
  export let editTodo: (todo: iTodo) => void;

  let startSoon: boolean = false;
  let dueSoon: boolean = false;

  $: {
    startSoon = todo.startDate
      ? new Date(todo.startDate).getTime() < new Date().getTime()
      : false;
    dueSoon = todo.dueDate
      ? new Date(todo.dueDate).getTime() < new Date().getTime()
      : false;
  }

  function deleteTodo() {
    removeTodo(todo.id);
  }

  function completeTodo() {
    todo.completed = true;
    editTodo(todo);
  }
</script>

<button
  class="todo-container"
  on:click={() => {
    open(TodoForm, { todo: { ...todo }, onSubmit: editTodo });
  }}
>
  <div class="title">
    {todo.title}
  </div>
  <button class="delete" on:click|stopPropagation={deleteTodo}>Delete</button>
  <button class="complete" on:click|stopPropagation={completeTodo}>
    {#if todo.completed}
      Archive
    {:else}
      Complete
    {/if}
  </button>

  <div class="date-pickers">
    {#if todo.startDate}<span>Start: {todo.startDate}</span>{/if}
    {#if todo.dueDate}<span>Due: {todo.dueDate}</span>{/if}
  </div>
</button>

<style>
  .todo-container {
    display: flex;
    flex-direction: row;
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    align-items: center;
    width: 100%;
    height: max-height;
  }
  .todo-container:hover {
    cursor: pointer;
    background-color: #fcfcfc;
    transition: 0.2s ease-in-out;
  }
  .date-pickers {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  .delete {
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    margin-left: 10px;
    background-color: red;
    color: white;
  }

  .delete:hover {
    cursor: pointer;
    background-color: darkred;
    transition: 0.2s ease-in-out;
  }
</style>
