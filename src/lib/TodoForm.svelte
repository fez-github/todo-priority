<script lang="ts">
  import { onMount } from "svelte";
  import type { iTodo } from "../types";
  import TodoDetail from "./TodoDetail.svelte";

  export let todo: iTodo = {
    id: Date.now(),
    title: "",
    description: "",
    urgency: 0,
    importance: 0,
    time: 0,
    completed: false,
    tags: ["Test1", "Test2"],
    subtasks: [],
    startDate: null,
    dueDate: null,
  };
  export let newForm: boolean = false;

  let title = "";
  let description = "";

  let urgency: number;
  let importance: number;
  let time: number;

  let startDate: Date;
  let dueDate: Date;

  let newTag: string = "";

  export let onSubmit: (todo: iTodo) => void;

  let urgentOptions: string[] = [
    "Null",
    "Not urgent",
    "A little urgent",
    "Somewhat urgent",
    "Very urgent",
    "Extremely urgent",
  ];
  let importantOptions: string[] = [
    "Null",
    "Not important",
    "A little important",
    "Somewhat important",
    "Very important",
    "Extremely important",
  ];
  let timeOptions: string[] = [
    "Null",
    "A couple minutes",
    "Several minutes",
    "Half an hour",
    "1 hour",
    "Several hours",
    "1 day",
    "Several days",
    "1 week",
    "2-3 weeks",
    "1 month",
    "Several months",
    "1 year",
    "Several years",
  ];
  function addTag(e: Event) {
    e.preventDefault();
    if (newTag.trim() === "") return;

    //Make newTag lower case and replace white space with hyphens
    newTag = newTag.trim().toLowerCase().replace(/\s/g, "-");
    todo.tags = [...todo.tags, newTag];
    newTag = "";
  }

  function removeTag(e: Event, index: number) {
    e.preventDefault();
    todo.tags = todo.tags.filter((_, i) => i !== index);
  }

  function formSubmit() {
    const newTodo: iTodo = {
      id: Date.now(),
      title: title,
      description: description,
      urgency: urgency,
      importance: importance,
      time: time,
      tags: todo.tags,
      completed: false,
      subtasks: [],
      startDate: startDate ? startDate.toString() : null,
      dueDate: dueDate ? dueDate.toString() : null,
    };

    console.log({ todo: newTodo });

    onSubmit(todo);

    //Reset form values.
    if (newForm) {
      todo.title = "";
      todo.description = "";
      todo.urgency = 0;
      todo.importance = 0;
      todo.time = 0;
      todo.tags = [];
      todo.startDate = null;
      todo.dueDate = null;
    }
  }

  onMount(() => {
    console.log({ todo });
  });
</script>

<form on:submit|preventDefault={formSubmit} id="todo-form">
  <label>
    Task:
    <input type="text" name="title" required bind:value={todo.title} />
  </label>
  <label>
    Description:
    <textarea name="description" bind:value={todo.description} />
  </label>
  <div class="priorities">
    <label>
      Urgency:
      <select bind:value={todo.urgency} name="urgency">
        {#each urgentOptions as option, index}
          <option value={index}>{option}</option>
        {/each}
      </select>
    </label>
    <label>
      Importance:
      <select bind:value={todo.importance} name="importance">
        {#each importantOptions as option, index}
          <option value={index}>{option}</option>
        {/each}
      </select>
    </label>
    <label>
      Time:
      <select bind:value={todo.time} name="time">
        {#each timeOptions as option, index}
          <option value={index}>{option}</option>
        {/each}
      </select>
    </label>
  </div>
  <div class="tag-input">
    <label for="tag-input">Tags:</label>
    <div class="tag-container">
      {#each todo.tags as tag, index}
        <div class="tag">
          <input class="entry" bind:value={tag} type="text" />
          <button on:click={(e) => removeTag(e, index)}>X</button>
        </div>
      {/each}
    </div>
    <input
      id="tag-input"
      type="text"
      bind:value={newTag}
      on:keydown={(e) => e.key === "Enter" && addTag(e)}
    />
  </div>
  <div class="date-pickers">
    <label>
      Start Date:
      <input type="date" name="startDate" bind:value={startDate} />
    </label>
    <label>
      Due Date:
      <input type="date" name="dueDate" bind:value={dueDate} />
    </label>
  </div>
  <button on:submit={formSubmit} type="submit">Save</button>
</form>

<style>
  .priorities {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  #todo-form {
    border-radius: 10px;
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .entry {
    background-color: darkblue;
    color: white;
    padding: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
  }
  .entry:hover {
    background-color: blue;
  }
  .tag-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    border: 1px solid black;
  }

  .tag-container {
    display: grid;
    grid-template-columns: repeat(3, minmax(100px, 3fr));
    gap: 5px;
  }
</style>
