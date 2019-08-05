import Link from 'next/link';
import React, { Component } from 'react';
import Router from 'next/router';

import AuthenticationService from '../services/authentication-service';

class SignUp extends Component {
  state = {
    email: '',
    error: '',
    password: '',
    username: ''
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { email, password, username } = this.state;
    await AuthenticationService.signUp({ email, password, username });
    Router.push('/signin');
  }

  render() {
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
    )
  }
}

export default SignUp;
