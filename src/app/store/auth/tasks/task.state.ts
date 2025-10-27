import { Task } from "src/app/model/task";

export interface TaskState {
  tasksByUser: { [email: string]: Task[] };
}

export const initialTaskState: TaskState = {
  tasksByUser: {}
};
