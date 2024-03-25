<script lang="ts">
    import type { iTodo } from "../types";
  
    import { getContext } from "svelte";
    import type { Context } from "svelte-simple-modal";
    import TodoForm from "./TodoForm.svelte";
    const { open } = getContext<Context>("simple-modal");
  
    export let todo: iTodo;
    export let editTodo: (todo: iTodo) => void;
    export let newForm: boolean = false;

    export function openForm(){
        open(TodoForm, { todo: { ...todo }, onSubmit: editTodo, newForm: newForm });
    }
</script>