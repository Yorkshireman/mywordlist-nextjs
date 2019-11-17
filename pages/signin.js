import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

const SignInPage = () => {
  return (
    <div>
      <Head>
        <title>MyWordlist | Signin</title>
      </Head>
      <Link href="/signup">
        <a>Don't have an account? Sign Up</a>
      </Link>
    </div>
  );
};

export default SignInPage;
