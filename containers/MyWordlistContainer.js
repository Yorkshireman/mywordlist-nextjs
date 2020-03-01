import Error from 'next/error';
import React, { useEffect, useState } from 'react';

import MyWordlist from '../components/MyWordlist';
import ResourcesService from '../services/resources-service';
import { setAuthToken } from '../components/helpers/setAuthToken';

const MyWordlistContainer = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [wordlistEntriesData, setWordlistEntriesData] = useState();

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
    setWordlistEntriesData(buildWordlistEntries(response));
  };

  useEffect(() => {
    fetchWordlist();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <Error statusCode={error.statusCode} title={error.name} />;
  if (wordlistEntriesData) return <MyWordlist wordlistEntriesData={wordlistEntriesData} />;
  return null;
};

export default MyWordlistContainer;
