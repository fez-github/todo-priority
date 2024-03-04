<script lang="ts">
  import Todo from './lib/TodoDetail.svelte';
  import TodoForm from './lib/TodoForm.svelte';
  import type { iTodo } from './types';

  //Import data.
  import sampledata from "./sampledata.json"
  import TodoSimple from './lib/TodoSimple.svelte';

  let todos: iTodo[] = sampledata.todos

  function addTodo(todo: iTodo) {
    todos = [...todos, todo]
    console.log({todos})

  }

  function removeTodo(id: number) {
    todos = todos.filter(todo => todo.id !== id)
  }
</script>

<main>
  {#each todos as todo}
    <TodoSimple {todo} removeTodo={removeTodo}/>
  {/each}
  <TodoForm onSubmit={addTodo}/>
</main>

<style>
  /* .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  } */
</style>