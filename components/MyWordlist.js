import { FormGroup, Input, Label } from 'reactstrap';
import { useState } from 'react';

import WordlistEntry from './WordlistEntry';

const MyWordlist = ({ wordlistEntriesData }) => {
  const [showDescriptions, setShowDescriptions] = useState(true);

  const handleChange = ({ target: { checked } }) => {
    setShowDescriptions(checked);
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
      {renderWordlistEntries(wordlistEntriesData)}
    </>
  );
};

export default MyWordlist;
