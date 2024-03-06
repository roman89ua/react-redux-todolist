import { memo, ReactNode } from 'react'
import { Col, Navbar, Row } from 'react-bootstrap'
import {
  StatisticReturn,
} from '../../hooks/use-tasks-statistic.ts'

export const TaskStatistic = memo(
  ({ statistic }: {statistic: StatisticReturn}): ReactNode => {
    return (
      <section title="statistic-section" className="w-100">
        <Navbar.Brand className="text-light">Tasks statistic</Navbar.Brand>
        <Row>
          <Col xs={10}>
            <p className="text-light m-0 d-flex flex-nowrap">Completed:</p>
          </Col>
          <Col xs={2}>
            <p className="text-light m-0 text-end">{statistic.completed}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={10}>
            <p className="text-light m-0 d-flex flex-nowrap">Not Completed:</p>
          </Col>
          <Col xs={2}>
            <p className="text-light m-0 text-end">{statistic.notCompleted}</p>
          </Col>
        </Row>
      </section>
    )
  },
)
