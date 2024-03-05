import { Task, TasksFilters } from '../state/types.ts'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store.ts'

type StatisticRetur = {
  completed: number
  notCompleted: number
}

const reduceCallback = (acc: StatisticRetur, curr: Task): StatisticRetur => {
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

const INITIAL_STATE = { 'completed': 0, 'notCompleted': 0 }

export const useTasksStatistic = (): StatisticRetur => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks)

  return useMemo(
    () => tasks?.reduce(reduceCallback, INITIAL_STATE),
    [tasks],
  )
}
