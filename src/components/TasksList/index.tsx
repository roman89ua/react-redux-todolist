import { ReactNode, useMemo } from "react"
import { Button, ListGroup } from "react-bootstrap"
import { Task, TasksFilters } from "../../state/tasks/types.ts"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../state/store.ts"
import { statusUpdate } from "../../state/tasks/tasksSlice.ts"

type TaskListProps = {
  deleteHandler: (task: Task) => void
}
export const TasksList = ({ deleteHandler }: TaskListProps): ReactNode => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks)

  const filter = useSelector((state: RootState) => state.tasks.filter)

  const dispatch = useDispatch()

  const tasksOutput = useMemo(() => {
    if (filter !== TasksFilters.all) {
      return tasks.filter((task) => task.status === filter)
    }
    return tasks
  }, [tasks, filter])

  const onStatusChange = (id: string): void => {
    dispatch(statusUpdate({ id }))
  }

  return (
    <ListGroup>
      {tasksOutput
        .map((task) => {
          return (
            <article key={task.id} className="position-relative">
              <ListGroup.Item
                className="d-flex justify-content-between"
                action
                onClick={() => onStatusChange(task.id)}
                variant={`${task.status === TasksFilters.completed ? "success" : ""}`}
              >
                {task.title}
              </ListGroup.Item>
              <Button
                variant="danger"
                className="button-position z-1 my-2 rounded-circle py-1 px-2 pt-0 d-flex justify-content-center align-items-center"
                onClick={() => deleteHandler(task)}
              >
                x
              </Button>
            </article>
          )
        })
        .reverse()}
    </ListGroup>
  )
}
