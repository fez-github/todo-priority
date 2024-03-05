<script lang="ts">
    import type { iTodo } from "../types";
    import TodoSimple from "./TodoSimple.svelte";

    export let kind: "current" | "finished"
    export let todos: iTodo[]
    export let removeTodo: (id: number) => void

    if(kind === "current") todos = todos.filter(todo => todo.completed === false)
    if(kind === "finished") todos = todos.filter(todo => todo.completed === true)
</script>

<div class="todo-board">
    <h3>{#if kind === "current"}
            Current Tasks
        {:else if kind === "finished"}
            Finished Tasks
        {/if}
    </h3>
    <div class="todo-container">
        {#each todos as todo}
            <TodoSimple {todo} {removeTodo} />
        {/each}
    </div>
</div>

<style>
    .todo-board{
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        padding: 10px;
        margin: 10px;
        
        border-radius: 5px;
        align-items: center;
        width: 400px;
        height: 700px;

        overflow-x: auto;
        overflow-y: scroll;
    }
</style>