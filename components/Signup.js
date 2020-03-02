import Error from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import Router from 'next/router';

import AuthenticationService from '../services/authentication-service';
import ResourcesService from '../services/resources-service';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
    case 'email':
      setEmail(value);
      break;
    case 'password':
      setPassword(value);
      break;
    case 'username':
      setUsername(value);
    }
  };

  const setAuthToken = async response => {
    const { data: { token } } = await response.json();
    window.localStorage.setItem('myWordlistAuthToken', token);
    return token;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    let token;
    try {
      setLoading(true);
      let response = await AuthenticationService.signUp({ email, password, username });
      token = await setAuthToken(response);
      response = await ResourcesService.createWordlist(token);
      await setAuthToken(response);
    } catch (e) {
      window.localStorage.setItem('myWordlistAuthToken', token);
      return setError(e);
    }

    Router.push('/');
  };

  return (
    <div>
      <Head>
        <title>MyWordlist | Signup</title>
      </Head>
      {error ? <Error statusCode={error.statusCode} title={error.name} /> :
        <div>
          <main className='signup'>
            <form onSubmit={handleSubmit}>
              <label htmlFor='username'>Username (public)</label>
              <input
                type='text'
                id='username'
                name='username'
                value={username}
                onChange={handleChange}
              />
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                id='email'
                name='email'
                value={email}
                onChange={handleChange}
              />
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={handleChange}
              />
              {loading ? <p>Loading...</p> :
                <button type='submit'>Sign Up</button>
              }
            </form>
            <Link href='/signin'>
              <a>Already have an account? Sign in</a>
            </Link>
          </main>
          <style jsx>
            {`
              .signup {
                max-width: 20rem;
                margin: 0 auto;
                padding: 1rem;
              }
              form {
                display: flex;
                flex-flow: column;
              }
              input {
                padding: 0.5rem;
                margin: 0.3rem 0 1rem;
              }
            `}
          </style>
        </div>
      }
    </div>
  );
};

export default SignUp;
