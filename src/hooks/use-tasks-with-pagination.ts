import { Task, TasksFilters } from '../state/types.ts'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store.ts'

export function useTasksWithPagination(): Array<Array<Task>> {
  const tasks = useSelector((state: RootState) => state.tasks.tasks)
  const filter = useSelector((state: RootState) => state.tasks.filter)
  const reducerCallbackFunc = (acc: Array<Array<Task>>,
    current: Task,
    index: number): Array<Array<Task>> => {
    if (index.toString().endsWith('0')) {
      return [...acc, [current]]
    }
    acc.at(-1)?.push(current)
    return [...acc]
  }

  return useMemo(() => {
    if (filter !== TasksFilters.all) {
      return tasks.filter((task) => task.status === filter)
    }
    return tasks
  }, [tasks, filter])?.reduce(reducerCallbackFunc, [])
}
