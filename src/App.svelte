<script lang="ts">
  import Todo from './lib/TodoDetail.svelte';
  import TodoForm from './lib/TodoForm.svelte';
  import type { iTodo } from './types';

  // import { Modals, closeModal, openModal } from 'svelte-modals'
  import Modal from 'svelte-simple-modal'

  //Import data.
  import sampledata from "./sampledata.json"
  import Board from './lib/Board.svelte';
    import TodoDetail from './lib/TodoDetail.svelte';
    import { getContext } from 'svelte';
    import ModalButton from './lib/ModalButton.svelte';

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
    <div class="board-container">
      <Board title="Completed Tasks" todos={todos.filter(todo => todo.completed === true)} {removeTodo} />
      <Board title="Current Tasks" todos={todos.filter(todo => todo.completed === false)} {removeTodo} />
    </div>
    <Modal classWindow="modal" closeOnEsc={true}>
      <ModalButton {removeTodo} />
    </Modal>
  <TodoForm onSubmit={addTodo}/>
</main>

<style>
  .board-container{
    display: flex;
    flex-direction: row;
  }
  /*From https://medium.com/@ResearchNowEng/making-perfectly-sized-centered-scrollable-modals-a36da09b68e6*/
  .modal {
    background:white;
    position:fixed;
    top:50%;
    left:50%;
    box-sizing:border-box;
    transform: translate(-50%,-50%);
    width:600px;
    max-width:calc(100% - 80px);
    max-height:calc(100% - 80px); 
}
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