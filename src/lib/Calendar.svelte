<script lang="ts">
  import { onMount } from "svelte";

  let currentDate: Date = new Date();
  let daysInMonth: number[] = [];
  let currentMonth: number = currentDate.getMonth();
  let currentYear: number = currentDate.getFullYear();

  function generateCalendar(): void {
    daysInMonth = [];

    let firstDayOfMonth: number = new Date(
      currentYear,
      currentMonth,
      1
    ).getDay();
    let startPosition = (firstDayOfMonth + 6) % 7;
    let lastDayOfMonth: Date = new Date(currentYear, currentMonth + 1, 0);

    for (let i: number = 1; i <= lastDayOfMonth.getDate(); i++) {
      daysInMonth.push(i);
    }
  }

  onMount(() => {
    generateCalendar();
  });

  function changeMonth(delta: number): void {
    currentMonth += delta;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    } else if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar();
  }
</script>

<div>
  <h1>{currentYear} - {currentMonth + 1}</h1>
  <button on:click={() => changeMonth(-1)}>Previous Month</button>
  <button on:click={() => changeMonth(1)}>Next Month</button>

  <div class="calendar">
    {#each daysInMonth as day}
      <div class="day">
        <span>{day}</span>
        <div class="misc">
          <!-- Add your miscellaneous spans here -->
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .calendar {
    display: flex;
    flex-wrap: wrap;
  }

  .day {
    width: calc(100% / 8);
    border: 1px solid #ccc;
    padding: 5px;
  }
</style>
