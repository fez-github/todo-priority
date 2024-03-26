<script lang="ts">
  import { onMount } from "svelte";

  let nav: HTMLDivElement;
  const observer = new IntersectionObserver(
    ([e]) => e.target.classList.toggle("scrolling", e.intersectionRatio < 1),
    { threshold: [1] }
  );

  onMount(() => {
    observer.observe(nav);
  });
</script>

<div
  bind:this={nav}
  class="flex justify-evenly bg-black text-white p-2.5 sticky top-0 z-10 w-full"
>
  <h1>Calendar</h1>
  <h1>Todo List</h1>
  <h1>New Task</h1>
</div>

<style>
  .scrolling {
    padding: 0px;
  }
</style>
