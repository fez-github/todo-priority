<!--Container for holding tasks.-->
<script lang="ts">
  import type { iTodo } from "../types";
  import TodoBoard from "./TodoBoard.svelte";

  export let todos: iTodo[];
  export let removeTodo: (id: number) => void;
  export let editTodo: (todo: iTodo) => void;

  export let title: string = "Default Title";
</script>

<div
  class="flex flex-col border border-solid border-black rounded-md
  p-5 m-[10px] items-center w-[400px] h-[700px] overflow-y-scroll"
>
  <h3>{title}</h3>
  {#each todos as todo}
    <TodoBoard {todo} {removeTodo} {editTodo} />
  {/each}
</div>
