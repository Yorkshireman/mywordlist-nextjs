import React, { Component } from 'react';

import ResourcesService from '../services/resources-service';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const token = window.localStorage.getItem('myWordlistAuthToken');
    const response = await ResourcesService.getWordlist(token);
    const wordlist = await response.json();
    // could create a Wordlist model
    this.setState({
      wordlist: JSON.stringify(wordlist, null, 2)
    });
  }

  render() {
    return (
      <div>
        <h3>this.state.wordlist:</h3>
        <p>{this.state.wordlist}</p>
      </div>
    );
  }
}

export default Home;
