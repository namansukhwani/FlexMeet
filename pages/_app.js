import { useEffect } from 'react'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'next-themes'
import Layout from '../components/Layout';
import UserLayout from '../components/UserLayout';
import { Provider as AuthProvider } from 'next-auth/client'
import { store, persistStrore } from '../redux/store';
import { wakeServer } from '../services/fetchService';

function MyApp({ Component, pageProps, router }) {

  useEffect(() => {
    wakeServer();
  }, [])

  // console.log(router.pathname)
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStrore} >
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
      </PersistGate>
    </Provider>
  )
}

export default MyApp
