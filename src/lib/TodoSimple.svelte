<script lang="ts">
  import type { iTodo } from "../types";

  import { getContext, onMount } from "svelte";
  import type { Context } from "svelte-simple-modal";
  import TodoDetail from "./TodoDetail.svelte";
  import TodoForm from "./TodoForm.svelte";
  const { open } = getContext<Context>("simple-modal");

  export let todo: iTodo;
  export let removeTodo: (id: number) => void;
  export let editTodo: (todo: iTodo) => void;

  function deleteTodo() {
    removeTodo(todo.id);
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
  <button class="delete" on:click={deleteTodo}>Delete</button>
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
    width: 400px;
  }
  .todo-container:hover {
    cursor: pointer;
    background-color: #fcfcfc;
    transition: 0.2s ease-in-out;
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
