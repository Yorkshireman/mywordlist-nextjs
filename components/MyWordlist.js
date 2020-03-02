import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useState } from 'react';

import WordlistEntry from './WordlistEntry';

const MyWordlist = ({ wordlistEntriesData }) => {
  const [showDescriptions, setShowDescriptions] = useState(true);
  const [addWordModal, setAddWordModal] = useState(false);

  const handleChange = ({ target: { checked } }) => setShowDescriptions(checked);

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
      <Button
        color='primary'
        onClick={toggleAddWordModal}
        style={{ position: 'fixed', bottom: '3em', right: '3em' }}
      >
        Add Word
      </Button>
      <Modal isOpen={addWordModal} toggle={toggleAddWordModal}>
        <ModalHeader toggle={toggleAddWordModal}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleAddWordModal}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggleAddWordModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
      {renderWordlistEntries(wordlistEntriesData)}
    </>
  );
};

export default MyWordlist;
