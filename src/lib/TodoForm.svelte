<script lang="ts">
  import type { iTodo } from "../types";

  let task = "";
  let description = "";

  let urgency = 0;
  let importance = 0;
  let time = 0;

  let tagText: string = "";
  let subtasks: string[] = [];

  let newEntry: string = "";
  let entries: string[] = ["Test1", "Test2"];

  export let onSubmit: (todo: iTodo) => void;

  function addTag() {
    console.log({ newEntry });
    if (newEntry.trim() === "") return;

    entries = [...entries, newEntry];
    newEntry = "";
    console.log({ entries });
  }

  function removeTag(index: number, e: Event) {
    //entries = entries.filter((_, i) => i !== index);
    console.log(e.target);
    console.log("Why am I fired?");
  }

  function formSubmit(event: Event) {
    console.log("Am I fired?");
    // console.log({ tagText });

    // let tags = tagText.split("\n");

    const todo: iTodo = {
      id: Date.now(),
      title: task,
      description: description,
      urgency: urgency,
      importance: importance,
      time: time,
      completed: false,
      tags: entries,
      subtasks: [],
      startDate: null,
      dueDate: null,
    };

    //Reset form values.
    task = "";
    description = "";
    urgency = 0;
    importance = 0;
    time = 0;
    entries = [];

    onSubmit(todo);
  }
</script>

<form on:submit|preventDefault={formSubmit} id="todo-form">
  <label>
    Task:
    <input type="text" required bind:value={task} />
  </label>
  <label>
    Description:
    <input type="text" bind:value={description} />
  </label>
  <div class="priorities">
    <label>
      Urgency:
      <input type="number" min="0" max="5" bind:value={urgency} />
    </label>
    <label>
      Importance:
      <input type="number" min="0" max="5" bind:value={importance} />
    </label>
    <label>
      Time:
      <input type="number" min="0" max="10" bind:value={time} />
    </label>
  </div>
  <div class="tag-input">
    <label for="tag-input">Tags:</label>
    <div class="tag-container">
      {#each entries as entry, index}
        <button class="entry" on:click={(e) => removeTag(index, e)}>
          {entry}
          <button>X</button>
        </button>
      {/each}
    </div>
    <input
      id="tag-input"
      type="text"
      bind:value={newEntry}
      on:keydown={(e) => e.key === "Enter" && addTag()}
    />
  </div>
  <button type="submit">Add</button>
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
  }

  .tag-container {
    display: grid;
    grid-template-columns: repeat(3, minmax(100px, 3fr));
    gap: 5px;
  }
</style>
