import Error from 'next/error';
import React, { useEffect, useState } from 'react';

import ResourcesService from '../services/resources-service';
import { setAuthToken } from './helpers/setAuthToken';

const MyWordlist = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [wordlist, setWordlist] = useState();

  const fetchWordlist = async () => {
    const currentToken = window.localStorage.getItem('myWordlistAuthToken');
    let response;
    try {
      response = await ResourcesService.getWordlist(currentToken);
      response = await response.json();
      const { data: { token: newToken } } = response;
      await setAuthToken(newToken);
    } catch (e) {
      setLoading(false);
      return setError(e);
    }

    setLoading(false);
    setWordlist(response.data.type);
  };

  useEffect(() => {
    fetchWordlist();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <Error statusCode={error.statusCode} title={error.name} />}
      {wordlist && <p>{wordlist}</p>}
    </div>
  );
};

export default MyWordlist;
