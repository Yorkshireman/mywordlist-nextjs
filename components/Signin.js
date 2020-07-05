import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import Error from 'next/error';
import Head from 'next/head';
import React, { useState } from 'react';
import Router from 'next/router';

import AuthenticationService from '../services/authentication-service';
import { setAuthToken } from './helpers/setAuthToken';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') {
      return setEmail(value);
    }

    if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await AuthenticationService.signIn({ email, password });
      const { data: { token: newToken } } = await response.json();
      await setAuthToken(newToken);
    } catch (e) {
      return setError(e);
    }

    if (Router.query?.successUrl) {
      const { query: { successUrl } } = Router;
      return Router.push(successUrl);
    }

    Router.push('/index');
  };

  return (
    <div>
      <Head>
        <title>MyWordlist | Signin</title>
      </Head>
      {error ? <Error statusCode={error.statusCode} title={error.name} /> :
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              onChange={handleChange}
              placeholder='valid@email.com'
              type='email'
              value={email}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              name='password'
              onChange={handleChange}
              placeholder='password placeholder'
              type='password'
              value={password}
            />
          </FormGroup>
          {loading ? <p>Loading...</p> :
            <Button>Submit</Button>
          }
        </Form>
      }
    </div>
  );
};

export default SignIn;
