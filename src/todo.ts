export interface Todo {
  id: number;
  title: string;
  description: string;
  urgency: number;
  importance: number;
  time: number;
  completed: boolean;
  tags: string[];
  subtasks: string[];
  startDate: Date | null;
  dueDate: Date | null;
}
