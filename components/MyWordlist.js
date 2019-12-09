import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
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
      modal: false,
      wordlistEntrySubmissionDescription: '',
      wordlistEntrySubmissionWord: ''
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = async event => {
    event.preventDefault();
    const {
      wordlistEntrySubmissionDescription: description,
      wordlistEntrySubmissionWord: word
    } = this.state;
    this.togglemodal();
    this.setState({
      wordlist: Wordlist({
        entries: [
          { description, word }
        ]
      })
    });

    // try {
    //   const response = await ResourcesService.createWordlistEntry({ description, word });
    //   const { data: { token } } = await response.json();
    //   await setAuthToken(token);
    // } catch (error) {
    //   return this.setState({ error });
    // }
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
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label htmlFor='word'>Word</Label>
                  <Input
                    id='wordlistEntrySubmissionWord'
                    name='wordlistEntrySubmissionWord'
                    onChange={this.handleChange}
                    placeholder='word'
                    type='text'
                    value={this.state.wordlistEntrySubmissionWord}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor='description'>description</Label>
                  <Input
                    id='wordlistEntrySubmissionDescription'
                    name='wordlistEntrySubmissionDescription'
                    onChange={this.handleChange}
                    placeholder='description'
                    type='text'
                    value={this.state.wordlistEntrySubmissionDescription}
                  />
                </FormGroup>
                <Button>Submit</Button>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.togglemodal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }

    return (
      <div>
        {this.state.wordlist.entries[0].word}
      </div>
    );
  }
}

export default MyWordlist;
