<script lang="ts">
  import type { iTodo } from "../types";

  import { getContext } from "svelte";
  import type { Context } from "svelte-simple-modal";
  import TodoForm from "./TodoForm.svelte";
  const { open } = getContext<Context>("simple-modal");

  export let todo: iTodo = {
    id: Date.now(),
    title: "",
    description: "",
    urgency: 0,
    importance: 0,
    time: 0,
    completed: false,
    tags: [],
    subtasks: [],
    startDate: null,
    dueDate: null,
  };
  export let addTodo: (todo: iTodo) => void;
  export let newForm: boolean = false;

  export function openForm() {
    open(TodoForm, { todo: { ...todo }, onSubmit: addTodo, newForm: newForm });
  }
</script>

<button class="text-lg" on:click={openForm}>New Todo</button>
