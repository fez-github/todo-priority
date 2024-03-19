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

  let expanded: boolean = true; //newForm ? false : true;

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
</script>

<form
  on:submit|preventDefault={formSubmit}
  class="border flex flex-col items-center m-2.5 p-2.5
  rounded-[10px] border-solid border-[black]"
>
  <div class="flex flex-row w-full">
    <label class="flex-grow">
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
  </div>

  <div class={expanded ? "flex flex-col items-center" : "hidden"}>
    <label>
      Description:
      <textarea
        class="block overflow-scroll"
        name="description"
        placeholder="Describe any details for your task."
        bind:value={todo.description}
      />
    </label>
    <div class="flex flex-col items-center gap-2.5;">
      <div>
        <div class="flex flex-row justify-between">
        <label for="urgency">Urgency:</label>
        <span>{urgentOptions[todo.urgency]}</span>
      </div>
        <input
          class="block"
          type="range"
          name="urgency"
          min="0"
          title="Set how urgent this task is."
          max={urgentOptions.length - 1}
          bind:value={todo.urgency}
        />
      </div>
      <div>
        <label for="importance">Importance:</label>
        <span>{importantOptions[todo.importance]}</span>
        <input
          class="block"
          type="range"
          name="importance"
          min="0"
          title="Set how important this task is."
          max={importantOptions.length - 1}
          bind:value={todo.importance}
        />
      </div>
      <div>
        <label for="time">Time:</label>
        <span>{timeOptions[todo.time]}</span>
        <input
          class="block"
          type="range"
          name="time"
          min="0"
          title="Set how much time this task will take."
          max={timeOptions.length - 1}
          bind:value={todo.time}
        />
      </div>
    </div>
    <div class="flex flex-col items-center border rounded-[10px] border-solid border-[black]">
      <label
        for="tag-input"
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
      <div class="grid grid-cols-[repeat(3,minmax(50px,3fr))] gap-[5px]">
        {#each todo.tags as tag, index}
          <div class="tag">
            <input class="bg-[darkblue] text-[white] mb-[5px] p-[5px] rounded-[5px] hover:bg-[blue]" bind:value={tag} type="text" />
            <button type="button" on:click={(e) => removeTag(e, index)}
              >X</button
            >
          </div>
        {/each}
      </div>
    </div>
    <div class="flex flex-col;">
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