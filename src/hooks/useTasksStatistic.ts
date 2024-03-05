import { TasksFilters } from "../state/tasks/types.ts"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../state/store.ts"

export const useTasksStatistic = (): {
  completed: number
  notCompleted: number
} => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks)

  return useMemo(
    () =>
      tasks.reduce(
        (acc, curr) => {
          if (curr.status === TasksFilters.completed)
            return {
              ...acc,
              completed: acc.completed + 1,
            }
          if (curr.status === TasksFilters.notCompleted)
            return {
              ...acc,
              notCompleted: acc.notCompleted + 1,
            }
          return acc
        },
        {
          completed: 0,
          notCompleted: 0,
        },
      ),
    [tasks],
  )
}
