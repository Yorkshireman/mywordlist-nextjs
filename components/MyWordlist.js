import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useState } from 'react';

import AddWordIcon from './AddWordIcon';
import { Alert } from 'reactstrap';
import ResourcesService from '../services/resources-service';
import { setAuthToken } from './helpers/setAuthToken';
import WordlistEntry from './WordlistEntry';

const MyWordlist = ({ wordlistEntriesData }) => {
  const [addWordModal, setAddWordModal] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [showDescriptions, setShowDescriptions] = useState(true);
  const [wordName, setWordName] = useState('');
  const [wordlistEntries, setWordlistEntries] = useState(wordlistEntriesData);
  const [wordlistEntryUploadErrors, setWordlistEntryUploadErrors] = useState([]);

  const onDismiss = () => setAlertVisible(false);

  const prependWordlistEntryToList = () => {
    setWordlistEntries([
      {
        description,
        word: { name: wordName }
      },
      ...wordlistEntries
    ]);
  };

  const handleChange = ({ target: { checked, name, value } }) => {
    if (name === 'wordName') {
      return setWordName(value);
    }

    if (name === 'description') {
      return setDescription(value);
    }

    setShowDescriptions(checked);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    prependWordlistEntryToList();
    try {
      const currentToken = window.localStorage.getItem('myWordlistAuthToken');
      const response = await ResourcesService.createWordlistEntry({ description, token: currentToken, name: wordName });
      // clear any uploadError from relevant wordlistEntry
      // hydrate wordlistEntry
      const { data: { token: newToken } } = await response.json();
      await setAuthToken(newToken);
    } catch (e) {
      console.log('error: ', e);
      setAlertVisible(true);
      setWordlistEntryUploadErrors([
        { wordName },
        ...wordlistEntryUploadErrors
      ]);
    }
  };

  const renderWordlistEntries = entries => entries.map((entry, index) => {
    const { description, word: { name } } = entry;
    const uploadError = Boolean(wordlistEntryUploadErrors.find(({ wordName }) => wordName === name));
    return (
      <WordlistEntry
        description={description}
        key={index}
        name={name}
        showDescriptions={showDescriptions}
        uploadError={uploadError}
      />
    );
  });

  const toggleAddWordModal = () => setAddWordModal(!addWordModal);

  return (
    <>
      <Alert color={'warning'} isOpen={alertVisible} toggle={onDismiss}>
          Wordlist entry failed to upload. Tap the icon to try again.
      </Alert>
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
              <Label for='wordName' style={{ marginBottom: '0' }}>Word:</Label>
              <Input aria-label='word' id='name' minLength='2' maxLength='64' name='wordName' onChange={handleChange} type='text' />
            </FormGroup>
            <FormGroup>
              <Label for='description' style={{ marginBottom: '0' }}>Description:</Label>
              <textarea aria-label='definition' className='form-control' id='description' name='description' onChange={handleChange} />
            </FormGroup>
            <Button color='primary' onClick={toggleAddWordModal} type='submit'>Add to Wordlist!</Button>{' '}
          </Form>
        </ModalBody>
      </Modal>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {renderWordlistEntries(wordlistEntries)}
      </ul>
      <AddWordIcon onClick={toggleAddWordModal} />
    </>
  );
};

export default MyWordlist;
