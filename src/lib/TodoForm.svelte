<script lang="ts">
  import type { iTodo } from "../types";
  import Todo from "./Todo.svelte";

  let task = ""
  let description = ""

  let urgency = 0
  let importance = 0
  let time = 0

  let tagText: string = ""
  let subtasks: string[] = []

  // export const onSubmit = (todo: iTodo) => {
  //   console.log("Form submitted")
  //   console.log(todo)
  // }

  export let onSubmit: (todo: iTodo) => void

  function formSubmit(event: Event) {
    console.log({tagText})

    let tags = tagText.split("\n")

    const todo: iTodo = {
      id: Date.now(),
      title: task,
      description: description,
      urgency: urgency,
      importance: importance,
      time: time,
      completed: false,
      tags: tags,
      subtasks: [],
      startDate: null,
      dueDate: null
    }
    onSubmit(todo)
  }
</script>

<form on:submit|preventDefault={formSubmit} id="todo-form">
  <label> Task: 
    <input type="text" required bind:value={task}/>
  </label>
  <label> Description:
    <input type="text" bind:value={description}/>
  </label>
  <div class="priorities">
    <label> Urgency:
      <input type="number" min="0" max="5" bind:value={urgency} />
    </label>
    <label> Importance:
      <input type="number" min="0" max="5" bind:value={importance} />
    </label>
    <label> Time:
      <input type="number" min="0" max="10" bind:value={time} />
    </label>
    <label> Tags:
      <textarea bind:value={tagText} />
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