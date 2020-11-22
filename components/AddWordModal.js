import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ValidationError from '../errors/validation-error';

const wordlistEntry = ({ description, wordName }) => {
  if (!wordName) throw new ValidationError('wordName cannot be empty');

  return {
    categories: [],
    description,
    id: uuidv4(),
    word: { name: wordName }
  };
};

const AddWordModal = ({ isOpen, setWordlistEntries, wordlistEntries, toggle }) => {
  const [description, setDescription] = useState('');
  const [wordName, setWordName] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'wordName') {
      setWordName(value);
    }

    if (name === 'description') {
      return setDescription(value);
    }
  };

  const handleSubmit = () => {
    setWordlistEntries([wordlistEntry({ description, wordName }), ...wordlistEntries]);
  };

  const wordNameIsNewToWordlist = wordlistEntries.find(({ word: { name } }) => name === wordName) ? false : true;
  const valid = Boolean(wordName.length) && wordNameIsNewToWordlist;
  const invalid = Boolean(wordName.length) && !valid;

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>New Word</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for='wordName' style={{ marginBottom: '0' }}>Word:</Label>
            <Input
              aria-label='word'
              id='name'
              invalid={invalid}
              maxLength='64'
              minLength='2'
              name='wordName'
              onChange={handleChange}
              style={{ textTransform: 'lowercase' }}
              type='text'
              valid={valid}
            />
            <FormFeedback>you already have this word</FormFeedback>
            <FormFeedback valid />
          </FormGroup>
          <FormGroup>
            <Label for='description' style={{ marginBottom: '0' }}>Description:</Label>
            <textarea aria-label='definition' className='form-control' id='description' name='description' onChange={handleChange} />
          </FormGroup>
          <Button color='primary' disabled={!valid} onClick={toggle} type='submit'>Add to Wordlist!</Button>{' '}
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddWordModal;
