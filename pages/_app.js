import { useEffect } from 'react'
import '../styles/globals.css'
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes'
import Layout from '../components/Layout';
import UserLayout from '../components/UserLayout';
import { Provider as AuthProvider } from 'next-auth/client'
import { encode } from 'base-64';

const url = process.env.NEXT_PUBLIC_SERVER_URL

function MyApp({ Component, pageProps, router }) {

  useEffect(() => {
    const wakeServer = () => {
      fetch(`${url}/wake`)
        .then(() => {
          console.log("server is Up");
        })
        .catch(err => console.log("Error from app.js ", err))
    }
    wakeServer();


  })

  // console.log(router.pathname)
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
