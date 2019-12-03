import Error from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import React, { Component } from 'react';
import Router from 'next/router';

import AuthenticationService from '../services/authentication-service';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  setAuthToken = async response => {
    const { data: { token } } = await response.json();
    window.localStorage.setItem('myWordlistAuthToken', token);
    return token;
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const response = await AuthenticationService.signIn({ email, password });
      await this.setAuthToken(response);
    } catch (error) {
      return this.setState({ error });
    }

    Router.push('/');
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
        <main className='signin'>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              id='email'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
            />
            <button type='submit'>Sign In</button>
          </form>
          <Link href="/signup">
            <a>Don't have an account? Sign Up</a>
          </Link>
        </main>
        <style jsx>{`
            .signin {
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
          `}</style>
      </div>
    );
  }
}

export default SignIn;
