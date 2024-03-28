<!--Form for adding and editing Todo information.-->
<script lang="ts">
  import type { iTodo } from "../types";

  import { getContext, onMount } from "svelte";
  import type { Context } from "svelte-simple-modal";
  import InputRange from "./InputRange.svelte";

  const { close } = getContext<Context>("simple-modal");

  export let todo: iTodo = {
    id: Date.now(),
    title: "",
    description: "",
    urgency: 0,
    importance: 0,
    time: 0,
    completed: false,
    tags: [],
    subtasks: [],
    startDate: null,
    dueDate: null,
  };

  export let newForm: boolean = true;
  export let onSubmit: (todo: iTodo) => void;

  let expanded: boolean = true;

  let newTag: string = "";

  let urgentOptions: string[] = [
    "",
    "Not urgent",
    "A little urgent",
    "Somewhat urgent",
    "Very urgent",
    "Extremely urgent",
  ];
  let importantOptions: string[] = [
    "",
    "Not important",
    "A little important",
    "Somewhat important",
    "Very important",
    "Extremely important",
  ];
  let timeOptions: string[] = [
    "",
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

  //Adjust the size of tag inputs to fit their content.
  function updateSize(e: Event) {
    // if (!(e.target instanceof HTMLInputElement)) return;
    // e.target.size = e.target.value.length - 2;
    // if (e.target.size >= 30) e.target.size = 30;
  }
</script>

<form
  on:submit|preventDefault={formSubmit}
  class="border flex flex-col items-center m-2.5 p-2.5
  rounded-[10px] border-solid border-[black] w-[50vw] max-w-[600px]"
>
  <div class="flex flex-row w-full gap-3">
    <label for="title"> Task: </label>
    <input
      type="text"
      name="title"
      id="title"
      class="w-8/12 flex-grow"
      title="Enter your task.  This is the only mandatory field."
      placeholder="Enter task..."
      required
      bind:value={todo.title}
    />
    <button
      type="button"
      title="Show/hide extra form inputs."
      on:click|preventDefault={toggleExpanded}
      >{expanded ? "Collapse" : "Expand"}</button
    >
  </div>

  <div class={expanded ? "flex flex-col items-center gap-2 w-full" : "hidden"}>
    <label class="w-1/2">
      Description:
      <textarea
        class="block overflow-scroll w-full"
        name="description"
        placeholder="Describe any details for your task."
        bind:value={todo.description}
      />
    </label>
    <div class="flex flex-col items-center w-full">
      <InputRange
        labelText="Urgency"
        valueText={urgentOptions[todo.urgency]}
        name="urgency"
        title="Set how urgent this task is."
        min={0}
        max={urgentOptions.length - 1}
        bind:value={todo.urgency}
      />
      <InputRange
        labelText="Importance"
        valueText={importantOptions[todo.importance]}
        name="importance"
        title="Set how important this task is."
        min={0}
        max={importantOptions.length - 1}
        bind:value={todo.importance}
      />
      <InputRange
        labelText="Time"
        valueText={timeOptions[todo.time]}
        name="time"
        title="Set how much time this task will take."
        min={0}
        max={timeOptions.length - 1}
        bind:value={todo.time}
      />
    </div>
    <div
      class="flex w-full flex-col items-center border rounded-lg border-solid border-[black]"
    >
      <label
        for="tag-input"
        class="my-2"
        title="Tags are used to help with searching or grouping similar tasks."
        >Tags: <input
          id="tag-input"
          type="text"
          bind:value={newTag}
          title="Enter a tag.  Press enter to add it."
          placeholder="Type a tag..."
          on:keydown={(e) => e.key === "Enter" && addTag(e)}
        /></label
      >
      <div class="flex flex-row flex-wrap gap-2">
        {#each todo.tags as tag, index}
          <div class="tag flex flex-row">
            <input
              class="bg-[darkblue] text-[white] m-1 rounded hover:bg-blue-700 w-24"
              name="tag-holder"
              bind:value={tag}
              on:input={(e) => updateSize(e)}
              type="text"
            />
            <button type="button" on:click={(e) => removeTag(e, index)}
              >X</button
            >
          </div>
        {/each}
      </div>
    </div>
    <div class="flex flex-col gap-2">
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
    <label>
      Complete?
      <input type="checkbox" name="isComplete" bind:checked={todo.completed} />
    </label>
  </div>
  <button class="my-2" on:submit={formSubmit} type="submit" title="Add task."
    >Save</button
  >
</form>
