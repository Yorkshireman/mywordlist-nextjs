import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useState } from 'react';

import AddWordIcon from './AddWordIcon';
import RefreshIcon from './RefreshIcon';
import ResourcesService from '../services/resources-service';
import { setAuthToken } from './helpers/setAuthToken';
import WordlistEntry from './WordlistEntry';
import { v4 as uuidv4 } from 'uuid';

const MyWordlist = ({ wordlistEntriesData }) => {
  const [addWordModal, setAddWordModal] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [showDescriptions, setShowDescriptions] = useState(true);
  const [wordName, setWordName] = useState('');
  const [wordlistEntries, setWordlistEntries] = useState(wordlistEntriesData);
  const [wordlistEntryUploadErrors, setWordlistEntryUploadErrors] = useState([]);

  const hydrateWordlistEntry = ({
    data: {
      attributes: {
        created_at: createdAt,
        word: {
          id,
          wordlist_ids: wordlistIds
        }
      },
      id: wordlistEntryId
    }
  }, entries) => {
    const entryIndex = entries.findIndex(i => i.id === wordlistEntryId);
    const entry = entries[entryIndex];

    entries.splice(entryIndex, 1, {
      ...entry,
      createdAt,
      word: {
        id,
        wordlistIds,
        ...entry.word
      }
    });

    setWordlistEntries(entries);
  };

  const onDismiss = () => setAlertVisible(false);

  const prependWordlistEntryToList = id => {
    const newList = [
      {
        description,
        id,
        word: { name: wordName }
      },
      ...wordlistEntries
    ];

    setWordlistEntries(newList);
    return newList;
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
    const id = uuidv4();
    const newList = prependWordlistEntryToList(id);
    try {
      const currentToken = window.localStorage.getItem('myWordlistAuthToken');
      const response = await ResourcesService.createWordlistEntry({ description, id, token: currentToken, name: wordName });
      const body = await response.json();
      await setAuthToken(body.data.token);
      hydrateWordlistEntry(body, newList);
    } catch (e) {
      setAlertVisible(true);
      setWordlistEntryUploadErrors([
        { wordName },
        ...wordlistEntryUploadErrors
      ]);
    }
  };

  const renderWordlistEntries = entries => entries.map(({ description, id, word: { name } }) => {
    const uploadError = Boolean(wordlistEntryUploadErrors.find(({ wordName }) => wordName === name));
    return (
      <WordlistEntry
        description={description}
        hydrateWordlistEntry={hydrateWordlistEntry}
        key={id}
        id={id}
        name={name}
        setAlertVisible={setAlertVisible}
        setWordlistEntryUploadErrors={setWordlistEntryUploadErrors}
        showDescriptions={showDescriptions}
        uploadError={uploadError}
        wordlistEntryUploadErrors={wordlistEntryUploadErrors}
      />
    );
  });

  const toggleAddWordModal = () => setAddWordModal(!addWordModal);

  return (
    <>
      <Alert color={'warning'} isOpen={alertVisible} toggle={onDismiss}>
        Wordlist entry failed to upload. Tap the <RefreshIcon bottom='0.05em' height='0.85em' /> icon to try again.
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
