import { Container } from 'react-bootstrap'
import { ReactNode, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './state/store.ts'
import { Task, TasksFilters } from './state/types.ts'

import { deleteTask } from './state/tasks/tasks-slice.ts'
import { ConfirmModal } from './components/ConfirmModal'
import { MainNavbar } from './components/MainNavbar'
import { TasksList } from './components/TasksList'

const INITIAL_TASK: Task = {
  'id': '',
  'title': '',
  'status': TasksFilters.notCompleted,
}

const NoTaskFallback = (): ReactNode => {
  return (
    <section>
      <h1 className="text-center">Sorry, but there are no tasks here yet.</h1>
    </section>
  )
}

function App(): ReactNode {
  const [confirmModal, setConfirmModal] = useState<{
    show: boolean
    currentTask: Task
  }>({
    'show': false,
    'currentTask': INITIAL_TASK,
  })

  const tasks = useSelector((state: RootState) => state.tasks.tasks)
  const filter = useSelector((state: RootState) => state.tasks.filter)
  const dispatch = useDispatch()

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

  const tasksOutput = useMemo(() => {
    if (filter !== TasksFilters.all) {
      return tasks.filter((task) => task.status === filter)
    }
    return tasks
  }, [tasks, filter])

  const listContent = tasks.length > 0 ? <TasksList
    tasks={tasksOutput}
    deleteHandler={onConfirmModalToggle}
  /> : <NoTaskFallback />

  return (
    <main>
      <MainNavbar />

      <Container>
        {listContent}
      </Container>

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
