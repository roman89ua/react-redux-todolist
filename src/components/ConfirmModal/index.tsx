import { Button, Modal } from 'react-bootstrap'
import { ReactNode } from 'react'

type ModalData = {
  title: string
  body: string
}
export type ConfirmModalProps = {
  show: boolean
  confirm: () => void
  onHide: () => void
  modaldata: ModalData
}
export const ConfirmModal = (props: ConfirmModalProps): ReactNode => {
  const { title, body } = props.modaldata

  const confirmHandler = (): void => {
    props.confirm()
    props.onHide()
  }
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="sm"
      aria-labelledby="confirm-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">{body}</Modal.Body>
      <Modal.Footer>
        <Button onClick={confirmHandler}>Confirm</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
