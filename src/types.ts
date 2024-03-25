export interface iTodo {
  id: number;
  title: string;
  description: string;
  urgency: number; //1-5 scale, 0 if unassigned.
  importance: number; //1-5 scale, 0 if unassigned.
  time: number; //1-10 scale, 0 if unassigned.
  completed: boolean;
  tags: string[];
  subtasks: string[];
  startDate: string | null;
  dueDate: string | null;
}

export interface iTag {
  id: number;
  name: string;
}

export interface iCalendarDay {
  date: number | "";
  todos: iTodo[];
  todoIndexes: number[];
}

export type kind = "completed" | "current";

export type due = "upcoming" | "due" | "overdue";
