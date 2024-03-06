import { ReactNode, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Task, TasksFilters } from './state/types.ts'

import { deleteTask } from './state/tasks/tasks-slice.ts'
import { ConfirmModal } from './components/ConfirmModal'
import { MainNavbar } from './components/MainNavbar'
import { TasksList } from './components/TasksList'
import { TasksPagination } from './components/TasksPagination'
import { Container } from 'react-bootstrap'
import { useTasksWithPagination } from './hooks/use-tasks-with-pagination.ts'

const INITIAL_TASK: Task = {
  'id': '',
  'title': '',
  'status': TasksFilters.notCompleted,
}

function App(): ReactNode {
  const [confirmModal, setConfirmModal] = useState<{
    show: boolean
    currentTask: Task
  }>({
    'show': false,
    'currentTask': INITIAL_TASK,
  })

  const tasksOutput = useTasksWithPagination()
  const dispatch = useDispatch()

  const [
    active,
    setActive,
  ] = useState<number>(0)

  const onDelete = (id: string): void => {
    dispatch(deleteTask({ id }))
  }
  function onConfirmModalToggle(task: Task): void {
    setConfirmModal((prevState) => ({
      ...prevState,
      'show': !prevState.show,
      'currentTask': task,
    }))
  }

  return (
    <main>
      <MainNavbar />

      <Container>
        <TasksList
          tasks={tasksOutput[active]}
          deleteHandler={onConfirmModalToggle}
        />
      </Container>

      <TasksPagination
        active={active}
        setActive={setActive}
        tasksOutput={tasksOutput}
      />

      <ConfirmModal
        show={confirmModal.show}
        onHide={() => onConfirmModalToggle(INITIAL_TASK)}
        confirm={() => onDelete(confirmModal.currentTask.id)}
        modaldata={{
          'title': 'Delete confirmation',
          'body': `You sure you want to delete this task: ${confirmModal
            .currentTask.title}`,
        }}
      />
    </main>
  )
}

export default App
