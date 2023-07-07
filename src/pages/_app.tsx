import '@/styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore, Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from '../utils/snackbarUtils';

import { store } from '../store/store';
import Loading from '../components/Loading';

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

import '../assets/css/selfservice_style.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
        <SnackbarProvider maxSnack={3}>
          <SnackbarUtilsConfigurator />
          <Component {...pageProps} />
        </SnackbarProvider>
        <Loading />
      </PersistGate>
    </Provider>
  );
}

export default App;
