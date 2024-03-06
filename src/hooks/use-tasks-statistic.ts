import { Task, TasksFilters } from '../state/types.ts'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store.ts'

const INITIAL_STATISTIC_STATE = { 'completed': 0, 'notCompleted': 0 }

export type StatisticReturn = {
  completed: number
  notCompleted: number
}

export const useTasksStatistic = (): StatisticReturn => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks)

  const reduceCallback = (
    acc: StatisticReturn, curr: Task,
  ): StatisticReturn => {
    if (curr.status === TasksFilters.completed) {
      return {
        ...acc,
        'completed': acc.completed + 1,
      }
    }
    if (curr.status === TasksFilters.notCompleted) {
      return {
        ...acc,
        'notCompleted': acc.notCompleted + 1,
      }
    }
    return acc
  }

  return useMemo(
    () => tasks?.reduce(reduceCallback, INITIAL_STATISTIC_STATE),
    [tasks],
  )
}
