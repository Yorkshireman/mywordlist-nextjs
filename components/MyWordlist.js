import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';

import Error from 'next/error';
import React, { Component } from 'react';

import ResourcesService from '../services/resources-service';
import { setAuthToken } from './helpers/setAuthToken';
import { Wordlist } from '../models/wordlist';

class MyWordlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  togglemodal = () => {
    const currentModalValue = this.state.modal;
    this.setState({ modal: !currentModalValue });
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
    if (!this.state.wordlist.entries) {
      return (
        <div>
          <Button onClick={this.togglemodal}>Add Word</Button>
          <Modal isOpen={this.state.modal} toggle={this.togglemodal}>
            <ModalHeader toggle={this.togglemodal}>Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.togglemodal}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.togglemodal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }

    return (
      <div>
      </div>
    );
  }
}

export default MyWordlist;
