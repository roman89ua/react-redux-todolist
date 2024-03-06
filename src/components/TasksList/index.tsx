import { ReactNode, memo } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { Task, TasksFilters } from '../../state/types.ts'
import { useDispatch } from 'react-redux'
import { statusUpdate } from '../../state/tasks/tasks-slice.ts'
import './styles.scss'

type TaskListProps = {
  tasks: Task[]
  deleteHandler: (task: Task) => void
}
export const TasksList = memo(
  ({ tasks, deleteHandler }: TaskListProps): ReactNode => {
    const dispatch = useDispatch()

    const onStatusChange = (id: string): void => {
      dispatch(statusUpdate({ id }))
    }

    return (
      <ListGroup>
        {tasks
          .map((task) => {
            return (
              <article key={task.id} className="position-relative">
                <ListGroup.Item
                  className="d-inline text-truncate"
                  action
                  onClick={() => onStatusChange(task.id)}
                  variant={`${task.status === TasksFilters
                    .completed ? 'success' : ''}`}
                >
                  {task.title}
                </ListGroup.Item>
                <Button
                  variant="danger"
                  className="button-position z-1 my-2 rounded-circle
                py-1 px-2 pt-0 d-flex justify-content-center align-items-center"
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
  },
)
