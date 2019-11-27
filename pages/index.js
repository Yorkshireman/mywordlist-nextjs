import Error from 'next/error';
import React, { Component } from 'react';

import ResourcesService from '../services/resources-service';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    let response;
    const token = window.localStorage.getItem('myWordlistAuthToken');
    try {
      response = await ResourcesService.getWordlist(token);
    } catch(error) {
      return this.setState({ error });
    }

    const wordlist = await response.json();
    // could create a Wordlist model
    this.setState({
      wordlist: JSON.stringify(wordlist, null, 2)
    });
  }

  render() {
    if (this.state.error) {
      const { name, statusCode } = this.state.error;
      return <Error statusCode={statusCode} title={name} />;
    }

    return (
      <div>
        <h3>this.state.wordlist:</h3>
        <p>{this.state.wordlist}</p>
      </div>
    );
  }
}

export default Home;
