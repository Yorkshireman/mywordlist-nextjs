import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import Header from './Header';

const Layout = props => {
  return (
    <div className='Layout'>
      <Head>
        <title>MyWordlist</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
      </Head>
      <Header />
      <div className='Content container'>{props.children}</div>
    </div>
  );
};

export default Layout;
