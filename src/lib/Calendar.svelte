<!--View scheduled tasks in calendar format.-->
<script lang="ts">
  import { onMount } from "svelte";
  import TodoDay from "./TodoDay.svelte";
  import type { iCalendarDay, iTodo } from "../types";

  export let todos: iTodo[] = [
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

  export let editTodo: (todo: iTodo) => void;

  let currentDate: Date = new Date();
  let calendarDays: iCalendarDay[] = [];

  let currentMonth: number = currentDate.getMonth() + 1;
  let currentYear: number = currentDate.getFullYear();

  let firstWeekday = new Date(currentYear, currentMonth - 1, 1).getDay();
  let lastDay = new Date(currentYear, currentMonth, 0).getDate();

  function generateCalendar(): void {
    calendarDays = [];

    //Generate empty days before the first day of the month.
    for (let i = 0; i < firstWeekday; i++) {
      calendarDays.push({ date: "", todoIndexes: [] });
    }

    //Generate days in the month.
    for (let i = 1; i <= lastDay; i++) {
      calendarDays.push({ date: i, todoIndexes: [] });
    }
  }

  /**
   *   Add each task to the correct day.
   *   Month & date functions assume yyyy-mm-dd format.
   */
  function populateDays() {
    for (let i = 0; i < todos.length; i++) {
      if (!todos[i].dueDate) continue;

      let month = todos[i].dueDate?.substring(5, 7).replaceAll("0", "");
      if (month !== currentMonth.toString()) continue;

      let day = Number(todos[i].dueDate?.substring(8, 10) as string);
      if (day > lastDay) continue;

      //Push index of todo into each day of the calendar.
      //When looking up tasks, we will only get the tasks that have an index pushed in.
      calendarDays[day + firstWeekday - 1].todoIndexes.push(i);
    }
  }

  function changeMonth(num: number): void {
    currentMonth += num;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    } else if (currentMonth < 1) {
      currentMonth = 12;
      currentYear--;
    }

    firstWeekday = new Date(currentYear, currentMonth - 1, 1).getDay();
    lastDay = new Date(currentYear, currentMonth, 0).getDate();

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

  <div class="flex flex-wrap">
    {#each ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"] as weekday}
      <div
        class=" w-[12.5%] p-[5px] text-center border border-solid border-[#ccc]"
      >
        <span>{weekday}</span>
      </div>
    {/each}
    {#each calendarDays as day}
      <div
        class="day flex flex-col p-[5px] w-[12.5%] border border-solid border-[#ccc]"
      >
        <span>{day.date}</span>
        <div>
          {#each day.todoIndexes as i}
            <TodoDay todo={todos[i]} {editTodo} />
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
