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
    const json = await response.json();
    this.setState({
      wordlist: JSON.stringify(json, null, 2)
    });
  }

  render() {
    return (
      <div>
        <h3>Props:</h3>
        <p>{this.state.wordlist}</p>
      </div>
    );
  }
}

export default Home;
