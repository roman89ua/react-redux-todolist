import { ReactNode } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addTask } from '../../state/tasks/tasks-slice.ts'
import * as yup from 'yup'
import { TasksFilters } from '../../state/types.ts'

type FormInputs = {
  newTask: string
}

const schema = yup
  .object({
    'newTask': yup
      .string()
      .trim()
      .min(1, 'Task name is to short. It has to be at list 2 chars long.')
      .max(50, 'Task name is too long. It has to be less the 51 chars long')
      .required(),
  })
  .required()

const AddTaskForm = (): ReactNode => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    'formState': { isValid },
  } = useForm<FormInputs>({
    'resolver': yupResolver(schema),
  })

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    dispatch(
      addTask({
        'id': crypto.randomUUID(),
        'title': data.newTask,
        'status': TasksFilters.notCompleted,
      }),
    )
    reset()
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
      <InputGroup>
        <Form.Control placeholder={'New task title'} {...register('newTask')} />
        <Button
          variant="secondary"
          id="add-new-task"
          type="submit"
          disabled={!isValid}
        >
          Add task
        </Button>
      </InputGroup>
    </Form>
  )
}

export default AddTaskForm
