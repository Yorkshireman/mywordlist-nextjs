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
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
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
      </div>
    );
  }
}

export default SignIn;
