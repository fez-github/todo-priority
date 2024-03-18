<!--Form for adding and editing Todo information.-->
<script lang="ts">
  import type { iTodo } from "../types";

  import { getContext } from "svelte";
  import type { Context } from "svelte-simple-modal";

  const { close } = getContext<Context>("simple-modal");

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

  export let newForm: boolean = true;
  export let onSubmit: (todo: iTodo) => void;

  let expanded: boolean = newForm ? false : true;

  let newTag: string = "";

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

  function toggleExpanded() {
    expanded = !expanded;
  }

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
    onSubmit({ ...todo });

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
    close();
  }
</script>

<form on:submit|preventDefault={formSubmit} id="todo-form">
  <label>
    Task:
    <input
      type="text"
      name="title"
      title="Enter your task.  This is the only mandatory field."
      placeholder="Enter task..."
      required
      bind:value={todo.title}
    />
  </label>
  <button
    type="button"
    title="Show/hide extra form inputs."
    on:click|preventDefault={toggleExpanded}
    >{expanded ? "Collapse" : "Expand"}</button
  >
  <div class={expanded ? "detail" : "hidden"}>
    <label>
      Description:
      <textarea
        name="description"
        placeholder="Describe any details for your task."
        bind:value={todo.description}
      />
    </label>
    <div class="priorities">
      <label>
        Urgency:
        <select
          bind:value={todo.urgency}
          name="urgency"
          title="Set how urgent this task is."
        >
          {#each urgentOptions as option, index}
            <option value={index}>{option}</option>
          {/each}
        </select>
      </label>
      <label>
        Importance:
        <select
          bind:value={todo.importance}
          name="importance"
          title="Set how important this task is."
        >
          {#each importantOptions as option, index}
            <option value={index}>{option}</option>
          {/each}
        </select>
      </label>
      <label>
        Time:
        <select
          bind:value={todo.time}
          name="time"
          title="Set how long you think this task may take."
        >
          {#each timeOptions as option, index}
            <option value={index}>{option}</option>
          {/each}
        </select>
      </label>
    </div>
    <div class="tag-input">
      <label
        for="tag-input"
        title="Tags are used to help with searching or grouping similar tasks."
        >Tags:</label
      >
      <div class="tag-container">
        {#each todo.tags as tag, index}
          <div class="tag">
            <input class="entry" bind:value={tag} type="text" />
            <button type="button" on:click={(e) => removeTag(e, index)}
              >X</button
            >
          </div>
        {/each}
      </div>
      <input
        id="tag-input"
        type="text"
        bind:value={newTag}
        title="Enter a tag.  Press enter to add it."
        placeholder="Type a tag..."
        on:keydown={(e) => e.key === "Enter" && addTag(e)}
      />
    </div>
    <div class="date-pickers">
      <label>
        Start Date:
        <input
          type="date"
          name="startDate"
          title="Date in which this task starts."
          bind:value={todo.startDate}
        />
      </label>
      <label>
        Due Date:
        <input
          type="date"
          name="dueDate"
          title="Date in which this task should be finished.."
          bind:value={todo.dueDate}
        />
      </label>
    </div>
  </div>
  <button on:submit={formSubmit} type="submit" title="Add task.">Save</button>
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

  .hidden {
    display: none;
  }

  .detail {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
