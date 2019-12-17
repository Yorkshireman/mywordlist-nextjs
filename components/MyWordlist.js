import Error from 'next/error';
import React, { useEffect, useState } from 'react';

import ResourcesService from '../services/resources-service';

const MyWordlist = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [wordlist, setWordlist] = useState();

  const fetchWordlist = async () => {
    let response;
    const token = window.localStorage.getItem('myWordlistAuthToken');
    try {
      response = await ResourcesService.getWordlist(token);
    } catch (e) {
      setLoading(false);
      return setError(e);
    }

    const responseJson = await response.json();
    setLoading(false);
    setWordlist(responseJson.data.type);
  }

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
