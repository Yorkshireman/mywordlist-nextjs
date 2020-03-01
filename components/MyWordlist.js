import WordlistEntry from './WordlistEntry';

const MyWordlist = ({ wordlistEntriesData }) => {
  const renderWordlistEntries = entries => entries.map((entry, index) => {
    const { description, word: { name } } = entry;
    return <WordlistEntry key={index} description={description} name={name} />;
  });

  return renderWordlistEntries(wordlistEntriesData);
};

export default MyWordlist;
