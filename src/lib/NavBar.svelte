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

<div bind:this={nav} class="nav-bar">
  <h1>Calendar</h1>
  <h1>Todo List</h1>
  <h1>New Task</h1>
</div>

<style>
  .nav-bar {
    display: flex;
    justify-content: space-evenly;
    color: white;
    background-color: black;
    padding: 10px;
    position: sticky;
    top: 0;
    z-index: 1;
    width: 100%;
  }

  .scrolling {
    padding: 0px;
  }
</style>
