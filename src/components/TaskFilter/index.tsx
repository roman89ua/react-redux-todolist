import { TasksFilters } from '../../state/types.ts'
import { ChangeEvent, ReactNode } from 'react'
import { filterChange } from '../../state/tasks/tasks-slice.ts'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../state/store.ts'

export const TasksFilter = (): ReactNode => {
  const currentFilter = useSelector((state: RootState) => state.tasks.filter)

  const dispatch = useDispatch()

  const filterChangeHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
    dispatch(filterChange(event.target.value as TasksFilters))
  }
  return (
    <section title="tasks-filter" className="w-100">
      <select
        defaultValue={currentFilter}
        className="form-select"
        aria-label="task-filter-by-status"
        onChange={filterChangeHandler}
      >
        {Object.values(TasksFilters).map((filter) => {
          return (
            <option key={filter} value={filter}>
              {filter}
            </option>
          )
        })}
      </select>
    </section>
  )
}
