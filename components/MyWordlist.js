import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useState } from 'react';

import AddWordIcon from './AddWordIcon';
import ResourcesService from '../services/resources-service';
import { setAuthToken } from './helpers/setAuthToken';
import WordlistEntry from './WordlistEntry';

const MyWordlist = ({ wordlistEntriesData }) => {
  const [addWordModal, setAddWordModal] = useState(false);
  const [description, setDescription] = useState('');
  const [showDescriptions, setShowDescriptions] = useState(true);
  const [word, setWord] = useState('');

  const handleChange = ({ target: { checked, name, value } }) => {
    if (name === 'word') {
      return setWord(value);
    }

    if (name === 'description') {
      return setDescription(value);
    }

    setShowDescriptions(checked);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    // add word to top of wordlist immediately
    try {
      const currentToken = window.localStorage.getItem('myWordlistAuthToken');
      const response = await ResourcesService.createWordlistEntry({ description, token: currentToken, name: word });
      const { data: { token: newToken } } = await response.json();
      await setAuthToken(newToken);
    } catch (e) {
      // remove word from wordlist perhaps
      console.log('error: ', e);
    }
  };

  const renderWordlistEntries = entries => entries.map((entry, index) => {
    const { description, word: { name } } = entry;
    return (
      <WordlistEntry
        description={description}
        key={index}
        name={name}
        showDescriptions={showDescriptions}
      />
    );
  });

  const toggleAddWordModal = () => setAddWordModal(!addWordModal);

  return (
    <>
      <div style={{ marginBottom: '0.5em' }}>
        <FormGroup check>
          <Label check>
            <Input
              defaultChecked={showDescriptions}
              onChange={handleChange}
              type='checkbox'
            />
            Descriptions
          </Label>
        </FormGroup>
      </div>
      <Modal isOpen={addWordModal} toggle={toggleAddWordModal}>
        <ModalHeader toggle={toggleAddWordModal}>New Word</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='word' style={{ marginBottom: '0' }}>Word:</Label>
              <Input aria-label='word' id='word' minLength='2' maxLength='64' name='word' onChange={handleChange} type='text' />
            </FormGroup>
            <FormGroup>
              <Label for='description' style={{ marginBottom: '0' }}>Description:</Label>
              <textarea aria-label='definition' className='form-control' id='description' name='description' onChange={handleChange} />
            </FormGroup>
            <Button color='primary' onClick={toggleAddWordModal} type='submit'>Add to Wordlist!</Button>{' '}
          </Form>
        </ModalBody>
      </Modal>
      {renderWordlistEntries(wordlistEntriesData)}
      <AddWordIcon onClick={toggleAddWordModal} />
    </>
  );
};

export default MyWordlist;
