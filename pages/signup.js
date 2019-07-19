import Link from 'next/link';
import React, { Component } from 'react';

class SignUp extends Component {
  static getInitialProps({ req }) {
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    return { protocol }
  }

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      error: '',
      password: '',
      username: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const { email, password, username } = this.state;
    const url = `${this.props.protocol}://localhost:3100/auth/register`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'email': email,
          'name': username,
          'password': password
        })
      })
      if (response.ok) {
        const { message } = await response.json()
        console.log('Registration request successful, message: ', message);
      } else {
        console.log('Registration failed.');
        // https://github.com/developit/unfetch#caveats
        // let error = new Error(response.statusText)
        // error.response = response
        // return Promise.reject(error)
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      )
      // throw new Error(error)
    }
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
            max-width: 340px;
            margin: 0 auto;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          form {
            display: flex;
            flex-flow: column;
          }
          input {
            padding: 8px;
            margin: 0.3rem 0 1rem;
          }
        `}</style>
      </div>
    )
  }
}

export default SignUp;
