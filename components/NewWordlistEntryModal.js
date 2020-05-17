import { Button, Input, Form, FormGroup, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';

const NewWordlistEntryModal = ({ addWordModal, toggleAddWordModal }) => {
  return (
    <Modal isOpen={addWordModal} toggle={toggleAddWordModal}>
      <ModalHeader toggle={toggleAddWordModal}>New Word</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for='word' style={{ marginBottom: '0' }}>Word:</Label>
            <Input type='text' aria-label='word' id='word' minLength='2' maxLength='64' />
          </FormGroup>
          <FormGroup>
            <Label for='description' style={{ marginBottom: '0' }}>Description:</Label>
            <textarea aria-label='definition' className='form-control' id='description' />
          </FormGroup>
          <Button color='primary' onClick={toggleAddWordModal} type='submit'>Add to Wordlist!</Button>{' '}
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default NewWordlistEntryModal;
