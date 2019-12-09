import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import Error from 'next/error';
import Head from 'next/head';
import React, { Component } from 'react';
import Router from 'next/router';

import AuthenticationService from '../services/authentication-service';
import { setAuthToken } from './helpers/setAuthToken';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const response = await AuthenticationService.signIn({ email, password });
      const { data: { token } } = await response.json();
      await setAuthToken(token);
    } catch (error) {
      return this.setState({ error });
    }

    Router.push('/mywordlist');
  }

  render() {
    if (this.state.error) {
      const { name, statusCode } = this.state.error;
      return <Error statusCode={statusCode} title={name} />;
    }

    return (
      <div>
        <Head>
          <title>MyWordlist | Signin</title>
        </Head>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              onChange={this.handleChange}
              placeholder='valid@email.com'
              type='email'
              value={this.state.email}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              name='password'
              onChange={this.handleChange}
              placeholder='password placeholder'
              type='password'
              value={this.state.password}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default SignIn;
