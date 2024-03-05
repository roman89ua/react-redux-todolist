import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task, TasksFilters, TasksState } from '../types.ts'

const findIndexByIndex = (arr: Task[], id: string): number => {
  return arr.findIndex((task) => task.id === id)
}

const initialState: TasksState = {
  'tasks': [],
  'filter': TasksFilters.all,
}

const tasksSlice = createSlice({
  'name': 'tasks',
  initialState,
  'reducers': {
    'addTask': (state, action: PayloadAction<Task>) => {
      state.tasks = [...state.tasks, action.payload]
    },

    'deleteTask': (state, action: PayloadAction<{ id: string }>) => {
      const elementIndex = findIndexByIndex(state.tasks, action.payload.id)
      state.tasks.splice(elementIndex, 1)
    },

    'statusUpdate': (state, action: PayloadAction<{ id: string }>) => {
      const elementIndex = findIndexByIndex(state.tasks, action.payload.id)
      state.tasks.splice(elementIndex, 1, {
        ...state.tasks[elementIndex],
        'status':
          state.tasks[elementIndex]
            .status === TasksFilters.notCompleted ? TasksFilters
              .completed : TasksFilters
              .notCompleted,
      })
    },

    'filterChange': (state, action: PayloadAction<TasksFilters>) => {
      state.filter = action.payload
    },
  },
})

export const { addTask, deleteTask, filterChange, statusUpdate } = tasksSlice
  .actions

export default tasksSlice.reducer
