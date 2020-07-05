import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useState } from 'react';

import AddWordIcon from './AddWordIcon';
import RefreshIcon from './RefreshIcon';
import WordlistEntry from './WordlistEntry';
import { v4 as uuidv4 } from 'uuid';

const MyWordlist = ({ wordlistEntriesData }) => {
  const [addWordModal, setAddWordModal] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [showDescriptions, setShowDescriptions] = useState(true);
  const [wordName, setWordName] = useState('');
  const [wordlistEntries, setWordlistEntries] = useState(wordlistEntriesData);

  const onDismiss = () => setAlertVisible(false);

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
    const newList = [
      {
        description,
        id: uuidv4(),
        word: { name: wordName }
      },
      ...wordlistEntries
    ];

    setWordlistEntries(newList);
  };

  const renderWordlistEntries = entries => entries.map(({
    createdAt,
    description,
    id,
    word: wordData
  }) => {
    return (
      <WordlistEntry
        createdAt={createdAt}
        description={description}
        key={id}
        id={id}
        setAlertVisible={setAlertVisible}
        showDescriptions={showDescriptions}
        wordData={wordData}
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
