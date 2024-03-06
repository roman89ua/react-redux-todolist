import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react'
import { Container, Pagination } from 'react-bootstrap'
import { Task } from '../../state/types.ts'

type TaskPaginationProps = {
  tasksOutput: Array<Array<Task>>
  active: number
  setActive: Dispatch<SetStateAction<number>>
}

export const TasksPagination = (
  { tasksOutput, active, setActive } : TaskPaginationProps,
): ReactNode => {
  useEffect(() => {
    setActive(tasksOutput.length - 1)
  }, [tasksOutput.length])
  return (
    <Container className="pt-4">
      {tasksOutput.length > 1 &&
          <Pagination className="justify-content-center">
            {tasksOutput.map((__, index) => {
              return (
                <Pagination.Item
                  active={active === index}
                  onClick={() => setActive(index)}
                  key={index + 1}
                >{index + 1}</Pagination.Item>
              )
            })}
          </Pagination>}
    </Container>
  )
}
