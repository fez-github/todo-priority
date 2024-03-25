<script lang="ts">
  import { onMount } from "svelte";
  import type { iCalendarDay, iTodo } from "../types";

  export let timedTodos: iTodo[] = [
    {
      id: Date.now(),
      title: "Test Title",
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

  let currentDate: Date = new Date();
  let calendarDays: iCalendarDay[] = [];

  let currentDay = currentDate.getDate();
  let currentMonth: number = currentDate.getMonth() + 1;
  let currentYear: number = currentDate.getFullYear();

  let firstWeekday: number = 0;
  let lastDay: number = 0;

  $: {
    firstWeekday = new Date(currentYear, currentMonth - 1, 1).getDay();
    lastDay = new Date(currentYear, currentMonth, 0).getDate();
  }

  function generateCalendar(): void {
    calendarDays = [];

    //Generate empty days before the first day of the month.
    for (let i = 0; i < firstWeekday; i++) {
      calendarDays.push({ date: "", todos: [] });
    }

    //Generate days in the month.
    for (let i = 1; i <= lastDay; i++) {
      calendarDays.push({ date: i, todos: [] });
    }
  }

  //Add each task to the correct day.
  //Month & date functions assume yyyy-mm-dd format.
  function populateDays() {
    console.log({ timedTodos });
    console.log({ calendarDays });

    for (let todo of timedTodos) {
      let month = todo.dueDate?.substring(5, 7).replaceAll("0", "") as string;
      if (month !== currentMonth.toString()) continue;

      let day = Number(todo.dueDate?.substring(8, 10) as string);
      if (day > lastDay) continue;

      calendarDays[Number(day) + firstWeekday - 1].todos.push(todo);
    }
    // calendarDays = [...calendarDays];
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
    populateDays();
  }

  onMount(() => {
    generateCalendar();
    populateDays();
  });
</script>

<div>
  <h1>{currentYear}-{currentMonth}</h1>
  <button on:click={() => changeMonth(-1)}>Previous Month</button>
  <button on:click={() => changeMonth(1)}>Next Month</button>

  <div class="calendar">
    {#each calendarDays as day}
      <div class="day">
        <span>{day.date}</span>
        <div class="todos">
          {#each day.todos as todo}
            <button class="todo">
              {todo.title}
            </button>
          {/each}
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
    display: flex;
    flex-direction: column;
  }
</style>
