import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useState } from 'react';

import AddWordIcon from './AddWordIcon';
import RefreshIcon from './RefreshIcon';
import ViewConfigInterface from './ViewConfigInterface';
import WordlistEntry from './WordlistEntry';
import { v4 as uuidv4 } from 'uuid';

const rSelectedValues = {
  CATEGORIES: 'CATEGORIES',
  DESCRIPTIONS: 'DESCRIPTIONS'
};

const MyWordlist = ({ wordlistEntriesData }) => {
  const { CATEGORIES, DESCRIPTIONS } = rSelectedValues;
  const [addWordModal, setAddWordModal] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [rSelected, setRSelected] = useState(CATEGORIES);
  const [showAddWordIcon, setShowAddWordIcon] = useState(true);
  const [wordName, setWordName] = useState('');
  const [wordlistEntries, setWordlistEntries] = useState(wordlistEntriesData);

  const onDismiss = () => setAlertVisible(false);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'wordName') {
      return setWordName(value);
    }

    if (name === 'description') {
      return setDescription(value);
    }
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
    categories,
    createdAt,
    description,
    id,
    word: wordData
  }) => {
    return (
      <WordlistEntry
        categories={categories}
        createdAt={createdAt}
        description={description}
        key={id}
        id={id}
        setAlertVisible={setAlertVisible}
        setShowAddWordIcon={setShowAddWordIcon}
        showCategories={rSelected === CATEGORIES}
        showDescriptions={rSelected === DESCRIPTIONS}
        wordData={wordData}
      />
    );
  });

  const toggleAddWordModal = () => setAddWordModal(!addWordModal);
  const viewConfigInterfaceProps = { rSelected, rSelectedValues, setRSelected };
  return (
    <>
      <Alert color={'warning'} isOpen={alertVisible} toggle={onDismiss}>
        Wordlist entry failed to upload. Tap the <RefreshIcon bottom='0.05em' height='0.85em' /> icon to try again.
      </Alert>
      <ViewConfigInterface {...viewConfigInterfaceProps} />
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
      {showAddWordIcon &&
      <AddWordIcon onClick={toggleAddWordModal} />}
    </>
  );
};

export default MyWordlist;
