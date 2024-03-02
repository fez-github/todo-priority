<script lang="ts">
  import type { iTodo } from "../types";
  import Todo from "./Todo.svelte";

  export const onSubmit = (todo: iTodo) => {
    console.log("Form submitted")
    console.log(todo)
  }

  function formSubmit(event: Event) {
    const form = event.target as HTMLFormElement

  }
</script>

<form on:submit|preventDefault={formSubmit} id="todo-form">
  <label> Task: 
    <input type="text" required/>
  </label>
  <label> Description:
    <input type="text" required/>
  </label>
  <div class="priorities">
    <label> Urgency:
      <input type="number" min="0" max="5" />
    </label>
    <label> Importance:
      <input type="number" min="0" max="5" />
    </label>
    <label> Time:
      <input type="number" min="0" max="10" />
    </label>
  </div>
  <button type="submit">Add</button>

</form>

<style>
  .priorities{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  #todo-form{
    border-radius: 10px;
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>