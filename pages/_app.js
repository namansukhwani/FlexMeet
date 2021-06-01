import '../styles/globals.css'
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes'
import Layout from '../components/Layout';
import UserLayout from '../components/UserLayout';
import { Provider as AuthProvider } from 'next-auth/client'


function MyApp({ Component, pageProps, router }) {
  console.log(router.pathname)
  return (
    <ThemeProvider attribute="class">

      <AuthProvider session={pageProps.session}>
        <Layout>
          {router.pathname.startsWith('/me') ?
            <UserLayout>
              <Component {...pageProps} />
            </UserLayout>
            :
            <Component {...pageProps} />
          }
        </Layout>
      </AuthProvider>
    </ThemeProvider>

  )
}

export default MyApp
