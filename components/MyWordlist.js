import Error from 'next/error';
import React, { useEffect, useState } from 'react';

import ResourcesService from '../services/resources-service';
import { setAuthToken } from './helpers/setAuthToken';

const MyWordlist = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [wordlistEntries, setWordlistEntries] = useState();

  // refactor into a WordlistEntry component
  const buildWordlistEntries = wordlistData => {
    const array = Object.values(wordlistData.data.wordlist_entries);
    return array.map(({ attributes: { description, word } }) => ({ description, word }));
  };

  const fetchWordlist = async () => {
    const currentToken = window.localStorage.getItem('myWordlistAuthToken');
    let response;
    try {
      response = await ResourcesService.getWordlist(currentToken);
      response = await response.json();
      const { data: { token: newToken } } = response;
      await setAuthToken(newToken);
      response = await ResourcesService.getWordlistEntries(newToken);
      response = await response.json();
    } catch (e) {
      setLoading(false);
      return setError(e);
    }

    setLoading(false);
    setWordlistEntries(buildWordlistEntries(response));
  };

  const renderWordlistEntries = wordlistEntries => {
    return wordlistEntries.map((entry, index) => {
      // use the word.name as the key once the backend never sends duplicate words
      return <p key={index}>{entry.word.name}: {entry.description}</p>;
    });
  };

  useEffect(() => {
    fetchWordlist();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <Error statusCode={error.statusCode} title={error.name} />}
      {wordlistEntries && renderWordlistEntries(wordlistEntries)}
    </div>
  );
};

export default MyWordlist;
