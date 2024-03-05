import { ReactNode } from 'react'
import { Col, Navbar, Row } from 'react-bootstrap'
import { useTasksStatistic } from '../../hooks/use-tasks-statistic.ts'

export const TaskStatistic = (): ReactNode => {
  const statistic = useTasksStatistic()

  return (
    <section title="statistic-section" className="w-100">
      <Navbar.Brand className="text-light">Tasks statistic</Navbar.Brand>
      <Row>
        <Col xs={10}>
          <p className="text-light m-0 d-flex flex-nowrap">Completed:</p>
        </Col>
        <Col xs={2}>
          <p className="text-light m-0">{statistic.completed}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={10}>
          <p className="text-light m-0 d-flex flex-nowrap">Not Completed:</p>
        </Col>
        <Col xs={2}>
          <p className="text-light m-0">{statistic.notCompleted}</p>
        </Col>
      </Row>
    </section>
  )
}
