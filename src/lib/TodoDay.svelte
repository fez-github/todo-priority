<script lang="ts">

   // import {openFo} from './TodoOpener.svelte'

    import type { iTodo } from "../types";
  
    import { getContext } from "svelte";
    import type { Context } from "svelte-simple-modal";
    import TodoForm from "./TodoForm.svelte";
    const { open } = getContext<Context>("simple-modal");
  
    export let todo: iTodo;
    export let editTodo: (todo: iTodo) => void;

    function changeComplete(){
        todo.completed = !todo.completed;
        editTodo(todo)
    }

</script>
<div class="flex flex-row w-full">
    <input type="checkbox" on:change={changeComplete}/>
    <button class="whitespace-nowrap {todo.completed ? "line-through": ""}"   on:click={() => {
        open(TodoForm, { todo: { ...todo }, onSubmit: editTodo, newForm: false });
      }}>{todo.title}</button>
</div>
