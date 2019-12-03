import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Error from 'next/error';
import React, { Component } from 'react';

import ResourcesService from '../services/resources-service';

class MyWordlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  toggle = () => {
    const currentModalValue = this.state.modal;
    this.setState({ modal: !currentModalValue });
  }

  async componentDidMount() {
    let response;
    const token = window.localStorage.getItem('myWordlistAuthToken');
    try {
      response = await ResourcesService.getWordlist(token);
    } catch (error) {
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
        <div>
          <Button color="danger" onClick={this.toggle}>Modal Button</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
        <h3>this.state.wordlist:</h3>
        {/* <p>{this.state.wordlist}</p> */}
      </div>
    );
  }
}

export default MyWordlist;
