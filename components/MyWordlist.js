import { FormGroup, Input, Label } from 'reactstrap';
import { useState } from 'react';

import AddWordIcon from './AddWordIcon';
import NewWordlistEntryModal from './NewWordlistEntryModal';
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
      <NewWordlistEntryModal addWordModal={addWordModal} toggleAddWordModal={toggleAddWordModal} />
      {renderWordlistEntries(wordlistEntriesData)}
      <AddWordIcon onClick={toggleAddWordModal} />
    </>
  );
};

export default MyWordlist;
