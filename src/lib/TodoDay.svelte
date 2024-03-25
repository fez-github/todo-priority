<script lang="ts">
    import type { iTodo } from "../types";
  
    import { getContext } from "svelte";
    import type { Context } from "svelte-simple-modal";
    import TodoForm from "./TodoForm.svelte";
    const { open } = getContext<Context>("simple-modal");
  
    export let todo: iTodo;
    export let editTodo: (todo: iTodo) => void;

    $: {
        console.log(todo.completed)
    }

</script>
<div class="flex flex-row w-full">
    <input type="checkbox" bind:value={todo.completed}/>
    <button class="whitespace-nowrap {todo.completed ? "line-through": ""}"   on:click={() => {
        open(TodoForm, { todo: { ...todo }, onSubmit: editTodo, newForm: false });
      }}>{todo.title}</button>
</div>
