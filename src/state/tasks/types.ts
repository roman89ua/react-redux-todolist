export enum TasksFilters {
  all = "All",
  completed = "Completed",
  notCompleted = "Not Completed",
}

export type TaskStatus = Omit<TasksFilters, "all">

export type Task = {
  id: string
  title: string
  status: TaskStatus
}
export type TasksState = {
  tasks: Array<Task>
  filter: TasksFilters
}
