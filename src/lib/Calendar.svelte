<script lang="ts">
  import { onMount } from "svelte";
  import type { iCalendarDay, iTodo } from "../types";

  export let timedTodos: iTodo[] = [
    {
      id: Date.now(),
      title: "",
      description: "",
      urgency: 0,
      importance: 0,
      time: 0,
      completed: false,
      tags: ["Test1", "Test2"],
      subtasks: [],
      startDate: "2024-03-01",
      dueDate: "2024-03-05",
    },
  ];

  //Determine what day the month starts on.

  //Have 6 rows.
  //Have 7 columns.

  let currentDate: Date = new Date();
  let calendarDays: iCalendarDay[] = [];

  let currentDay = currentDate.getDate();
  let currentMonth: number = currentDate.getMonth() + 1;
  let currentYear: number = currentDate.getFullYear();

  function generateCalendar(): void {
    calendarDays = [];

    let firstDayOfMonth: number = new Date(
      currentYear,
      currentMonth - 1,
      1
    ).getDay();

    //Generate empty days before the first day of the month.
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push({ date: null, todos: [] });
    }

    let lastDayOfMonth: number = new Date(
      currentYear,
      currentMonth - 1,
      0
    ).getDate();

    //Generate days in the month.
    for (let i = 1; i <= lastDayOfMonth; i++) {
      calendarDays.push({ date: i, todos: [] });
    }
  }

  //Add each task to the correct day.
  //Month & date functions assume yyyy-mm-dd format.
  function populateDays() {
    for (let todo of timedTodos) {
      let month = todo.dueDate?.substring(5, 7) as string;
      if (month != currentMonth.toString()) continue;

      let day = todo.dueDate?.substring(8, 10) as string;
      if (day > currentDay.toString()) continue;

      calendarDays[currentDay - 1].todos.push(todo);
    }
  }

  function changeMonth(num: number): void {
    currentMonth += num;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    } else if (currentMonth < 0) {
      currentMonth = 1;
      currentYear--;
    }
    generateCalendar();
  }

  onMount(() => {
    generateCalendar();
    populateDays();
  });
</script>

<div>
  <h1>{currentYear} - {currentMonth + 1}</h1>
  <button on:click={() => changeMonth(-1)}>Previous Month</button>
  <button on:click={() => changeMonth(1)}>Next Month</button>

  <div class="calendar">
    {#each calendarDays as day}
      <div class="day">
        <span>{day.date}</span>
        <div class="todos">
          {#each day.todos as todo}
            <div class="todo">
              <span>{todo.title}</span>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<!-- <script lang="ts">
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
-->

<style>
  .calendar {
    display: flex;
    flex-wrap: wrap;
  }

  .day {
    width: calc(100% / 8);
    border: 1px solid #ccc;
    padding: 5px;
    display: flex;
    flex-direction: column;
  }
</style>
