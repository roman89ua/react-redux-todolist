import { ReactNode } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import AddTaskForm from '../AddTaskForm'
import { TasksFilter } from '../TaskFilter'
import { TaskStatistic } from '../TaskStatistic'

export const MainNavbar = (): ReactNode => {
  return (
    <Navbar
      bg="primary"
      data-bs-theme="light"
      sticky="top"
      className="mb-3 p-4"
    >
      <Container className={'d-flex gap-3 flex-column flex-lg-row'}>
        <Navbar.Brand className="text-light">Your tasks</Navbar.Brand>

        <AddTaskForm />

        <TasksFilter />

        <TaskStatistic />
      </Container>
    </Navbar>
  )
}
