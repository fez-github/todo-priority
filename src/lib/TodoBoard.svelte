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

  function deleteTodo() {
    removeTodo(todo.id);
  }

  function changeCompletion() {
    todo.completed = !todo.completed;
    editTodo(todo);
  }

  function revealButtons(){
    
  }
</script>

<button
  class="todo-container"
  on:click={() => {
    open(TodoForm, { todo: { ...todo }, onSubmit: editTodo, newForm: false });
  }} 
  ><div class="flex flex-col w-full">
    <div class="dates">
      {#if todo.startDate}<span>Start: {todo.startDate}</span>{/if}
      {#if todo.dueDate}<span>Due: {todo.dueDate}</span>{/if}
    </div>
    <div class="flex flex-row justify-between gap-3">
      <h2 class="title">
        {todo.title}
      </h2>
      <div class="flex flex-col justify-center">
        <span>
          Urgency: {todo.urgency}
        </span>
        <span>
          Importance: {todo.importance}
        </span>
        <span>
          Time: {todo.time}
        </span>
      </div>
    </div>
  </div>
</button>

<style>
  .todo-container {
    display: flex;
    flex-direction: row;
    gap: 10px;
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
  .dates {
    display: flex;
    flex-direction: row;
    justify-content: center;
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
