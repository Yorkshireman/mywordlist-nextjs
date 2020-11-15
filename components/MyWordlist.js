import { Alert } from 'reactstrap';
import { useState } from 'react';

import AddWordIcon from './AddWordIcon';
import AddWordModal from './AddWordModal';
import AllowedCategoriesContainer from './AllowedCategoriesContainer';
import RefreshIcon from './RefreshIcon';
import ViewConfigInterface from './ViewConfigInterface';
import WordlistEntry from './WordlistEntry';

const rSelectedValues = {
  CATEGORIES: 'CATEGORIES',
  DESCRIPTIONS: 'DESCRIPTIONS'
};

const MyWordlist = ({ wordlistEntriesData }) => {
  const { CATEGORIES, DESCRIPTIONS } = rSelectedValues;
  const [addWordModalIsOpen, setAddWordModalIsOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [allowedCategories, setAllowedCategories] = useState([]);
  const [rSelected, setRSelected] = useState(CATEGORIES);
  const [showAddWordIcon, setShowAddWordIcon] = useState(true);
  const [wordlistEntries, setWordlistEntries] = useState(wordlistEntriesData);

  const addToAllowedCategories = ({ target }) => {
    const id = target.getAttribute('id');
    const name = target.textContent;

    if (allowedCategories.find(cat => cat.id === id)) return;

    setAllowedCategories([
      ...allowedCategories,
      { id, name }
    ]);
  };

  const renderWordlistEntries = entries => {
    const filteredEntries = entries.filter(({ categories }) => {
      if (!allowedCategories.length) return true;
      return allowedCategories.some(({ id }) => categories.find(category => category.id === id));
    });

    return filteredEntries.map(({
      categories,
      createdAt,
      description,
      id,
      word: wordData
    }) => {
      return (
        <WordlistEntry
          addToAllowedCategories={addToAllowedCategories}
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
  };

  const toggleAddWordModal = () => setAddWordModalIsOpen(!addWordModalIsOpen);

  const addWordModalProps = {
    isOpen: addWordModalIsOpen,
    setWordlistEntries,
    toggle: toggleAddWordModal,
    wordlistEntries
  };

  const viewConfigInterfaceProps = { rSelected, rSelectedValues, setRSelected };

  return (
    <>
      <Alert color={'warning'} isOpen={alertVisible} toggle={() => setAlertVisible(false)}>
        Wordlist entry failed to upload. Tap the <RefreshIcon bottom='0.05em' height='0.85em' /> icon to try again.
      </Alert>
      <div style={{ display: 'flex' }}>
        <AllowedCategoriesContainer allowedCategories={allowedCategories} />
        <ViewConfigInterface {...viewConfigInterfaceProps} />
      </div>
      <AddWordModal {...addWordModalProps} />
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {renderWordlistEntries(wordlistEntries)}
      </ul>
      {showAddWordIcon &&
      <AddWordIcon onClick={toggleAddWordModal} />}
    </>
  );
};

export default MyWordlist;
