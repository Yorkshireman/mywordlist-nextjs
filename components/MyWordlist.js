import { Button } from 'reactstrap';
import Error from 'next/error';
import React, { Component } from 'react';

import ResourcesService from '../services/resources-service';
import { setAuthToken } from './helpers/setAuthToken';
import { Wordlist } from '../models/wordlist';

class MyWordlist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const currentToken = window.localStorage.getItem('myWordlistAuthToken');
    let response;

    try {
      response = await ResourcesService.getWordlist(currentToken);
      response = await response.json();
      const { data: { token: newToken } } = response;
      await setAuthToken(newToken);
    } catch (error) {
      return this.setState({ error });
    }

    this.setState({
      wordlist: Wordlist(response.data.attributes)
    });
  }

  render() {
    if (this.state.error) {
      const { name, statusCode } = this.state.error;
      return <Error statusCode={statusCode} title={name} />;
    }

    if (!this.state.wordlist) return null;
    if (!this.state.wordlist.entries) return <Button>Add Word</Button>;
    return (
      <div>
      </div>
    );
  }
}

export default MyWordlist;
