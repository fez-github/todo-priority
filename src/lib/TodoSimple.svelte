<!--Object that displays simple information about a todo.  
  Allows basic interaction, such as marking a task as complete.-->
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

  //Check if start date or due date is within 1 week from now.
  if (todo.startDate) {
    const date = new Date(todo.startDate);
    startSoon = date < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }
  if (todo.dueDate) {
    const date = new Date(todo.dueDate);
    dueSoon = date < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
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
    open(TodoForm, { todo: { ...todo }, onSubmit: editTodo, newForm: false });
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
