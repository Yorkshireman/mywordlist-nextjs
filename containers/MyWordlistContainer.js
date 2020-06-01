import Error from 'next/error';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';

import MyWordlist from '../components/MyWordlist';
import ResourcesService from '../services/resources-service';
import { setAuthToken } from '../components/helpers/setAuthToken';

const MyWordlistContainer = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [wordlistEntriesData, setWordlistEntriesData] = useState();

  const buildWordlistEntries = wordlistData => {
    const array = Object.values(wordlistData.data.wordlist_entries);
    return array.map(({
      attributes: {
        created_at: createdAt,
        description,
        word: {
          id,
          name,
          wordlist_ids: wordlistIds
        }
      }
    }) => ({
      createdAt,
      description,
      word: {
        id,
        name,
        wordlistIds
      }
    }));
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

  if (loading) {
    return <Spinner
      style={{
        bottom: '40px',
        left: '0',
        height: '6rem',
        margin: 'auto',
        position: 'absolute',
        right: '0',
        top: '0',
        width: '6rem',
      }}
    />;
  }

  if (error) return <Error statusCode={error.statusCode} title={error.name} />;
  if (wordlistEntriesData) return <MyWordlist wordlistEntriesData={wordlistEntriesData} />;
  return null;
};

export default MyWordlistContainer;
