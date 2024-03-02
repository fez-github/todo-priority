export interface iTodo {
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

export interface iTag {
  id: number;
  name: string;
}
