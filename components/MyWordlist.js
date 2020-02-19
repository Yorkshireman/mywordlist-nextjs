import Error from 'next/error';
import React, { useEffect, useState } from 'react';

import ResourcesService from '../services/resources-service';
import { setAuthToken } from './helpers/setAuthToken';

const MyWordlist = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [wordlistEntries, setWordlistEntries] = useState();

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
    // console.log(JSON.stringify(Object.values(response.data.wordlist_entries), null, 2));
    // console.log(Object.values(response.data.wordlist_entries));
    console.log('response: ', response);
    setWordlistEntries('hello');

    console.log('wordlistEntries: ', wordlistEntries);
  };

  useEffect(() => {
    fetchWordlist();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <Error statusCode={error.statusCode} title={error.name} />}
      {/* {wordlistEntries && <p>{wordlistEntries}</p>} */}
    </div>
  );
};

export default MyWordlist;
