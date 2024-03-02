<script lang="ts">
  import Todo from './lib/Todo.svelte';
  import TodoForm from './lib/TodoForm.svelte';
  import type { iTodo } from './types';

  let todos: iTodo[] = [
    {
      id: 1,
      title: 'Todo 1',
      description: 'This is my first todo',
      urgency: 3,
      importance: 3,
      time: 5,
      completed: false,
      tags: [],
      subtasks: [],
      startDate: null,

      dueDate: null

    }
  ]

  function addTodo(todo: iTodo) {
    todos = [...todos, todo]
  }
</script>

<main>
  {#each todos as todo}
    <Todo {todo}/>
  {/each}
  <TodoForm />
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