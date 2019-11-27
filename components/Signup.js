import Error from 'next/error';
import Link from 'next/link';
import React, { Component } from 'react';
import Router from 'next/router';

import AuthenticationService from '../services/authentication-service';
import ResourcesService from '../services/resources-service';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    username: ''
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
    const { email, password, username } = this.state;
    let token;
    try {
      let response = await AuthenticationService.signUp({ email, password, username });
      token = await this.setAuthToken(response);
      response = await ResourcesService.createWordlist(token);
      await this.setAuthToken(response);
    } catch (error) {
      window.localStorage.setItem('myWordlistAuthToken', token);
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
        <main className='signup'>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='username'>Username (public)</label>
            <input
              type='text'
              id='username'
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
            />
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
            <button type='submit'>Sign Up</button>
          </form>
          <Link href="/signin">
            <a>Already have an account? Sign in</a>
          </Link>
        </main>
        <style jsx>{`
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
        `}</style>
      </div>
    );
  }
}

export default SignUp;
