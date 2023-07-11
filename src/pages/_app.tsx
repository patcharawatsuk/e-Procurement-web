import '@/src/styles/globals.css';

import React from 'react';
import type { AppProps } from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore, Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from '../utils/snackbarUtils';

import { store } from '../store/store';
import Loading from '../components/Loading';
import DefaultLayout from '@defaultLayout';
import withAuth from '../utils/withAuth';

import '../assets/css/styles.css';

function App({ Component, pageProps }: AppProps) {

  const ComponentWithAuth = withAuth(Component);

  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
        <SnackbarProvider maxSnack={3}>
          <SnackbarUtilsConfigurator />
          <DefaultLayout>
              <ComponentWithAuth {...pageProps} />
          </DefaultLayout>
        </SnackbarProvider>
        <Loading />
      </PersistGate>
    </Provider>
  );
}

export default App;
