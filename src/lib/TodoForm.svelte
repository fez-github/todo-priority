<script lang="ts">
    import { onMount } from "svelte";
  import type { iTodo } from "../types";

  let task = "";
  let description = "";

  let urgency: number;
  let importance: number;
  let time: number;

  let newTag: string = "";
  let allTags: string[] = ["Test1", "Test2"];

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

  export let onSubmit: (todo: iTodo) => void;

  function addTag() {
    if (newTag.trim() === "") return;

    allTags = [...allTags, newTag];
    newTag = "";
  }

  function removeTag(index: number, e: Event) {
    allTags = allTags.filter((_, i) => i !== index);
  }

  function formSubmit(event: Event) {

    const todo: iTodo = {
      id: Date.now(),
      title: task,
      description: description,
      urgency: urgency,
      importance: importance,
      time: time,
      tags: allTags,
      completed: false,
      subtasks: [],
      startDate: null,
      dueDate: null,
    };

    console.log({todo})

    //Reset form values.
    task = "";
    description = "";
    urgency = 0;
    importance = 0;
    time = 0;
    allTags = [];

    onSubmit(todo);
  }
</script>

<form on:submit|preventDefault={formSubmit} id="todo-form">
  <label>
    Task:
    <input type="text" name="title" required bind:value={task} />
  </label>
  <label>
    Description:
    <input type="text" name="description" bind:value={description} />
  </label>
  <div class="priorities">
    <label>
      Urgency:
      <!-- <input type="number" min="0" max="5" bind:value={urgency} /> -->
      <select bind:value={urgency} name="urgency">
        {#each urgentOptions as option, index}
          <option value={index}>{option}</option>
        {/each}
      </select>
    </label>
    <label>
      Importance:
      <!-- <input type="number" min="0" max="5" bind:value={importance} /> -->
      <select bind:value={importance} name="importance">
        {#each importantOptions as option, index}
          <option value={index}>{option}</option>
        {/each}
      </select>
    </label>
    <label>
      Time:
      <!-- <input type="number" min="0" max="10" bind:value={time} /> -->
      <select bind:value={time} name="time">
        {#each timeOptions as option, index}
          <option value={index}>{option}</option>
        {/each}
      </select>
    </label>
  </div>
  <div class="tag-input">
    <label for="tag-input">Tags:</label>
    <div class="tag-container">
      {#each allTags as entry, index}
        <span class="entry">
          {entry}
          <button on:click={(e) => removeTag(index, e)}>X</button>
        </span>
      {/each}
    </div>
    <input
      id="tag-input"
      type="text"
      bind:value={newTag}
      on:keydown={(e) => e.key === "Enter" && addTag()}
    />
  </div>
  <button on:click={formSubmit} type="submit">Add</button>
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
    cursor: pointer;
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
