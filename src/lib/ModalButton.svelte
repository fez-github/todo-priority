<script lang="ts">
    import { getContext } from 'svelte';
    import type { Context } from 'svelte-simple-modal';
    import TodoDetail from './TodoDetail.svelte';
    import type { iTodo } from '../types';

    const {open} = getContext<Context>('simple-modal')

    //export let thisTodo: iTodo

    let thisTodo: iTodo =     {
      "id": 1,
      "title": "Todo 1",
      "description": "This is my first todo",
      "urgency": 3,
      "importance": 3,
      "time": 5,
      "completed": false,
      "tags": [],
      "subtasks": [],
      "startDate": null,
      "dueDate": null
    }

    export let removeTodo: (id: number) => void

    function handleClick() {
        open(TodoDetail,{todo: thisTodo,removeTodo})
        //openModal(TodoDetail, {todo: todos[0], removeTodo})
    }
</script>

<button on:click={handleClick}>Modal</button>
