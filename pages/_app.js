import '../styles/globals.css'
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes'
import Layout from '../components/Layout';
import UserLayout from '../components/UserLayout';

function MyApp({ Component, pageProps, router }) {
  console.log(router.pathname)
  return (
    <ThemeProvider attribute="class">
      <Layout>
        {router.pathname.startsWith('/me') ?
          <UserLayout>
            <Component {...pageProps} />
          </UserLayout>
          :
          <Component {...pageProps} />
        }
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
