import { AppProps } from 'next/app';
import React from 'react';
import '../mocks/server';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from 'primereact/api';

function MyApp({ Component, pageProps }: AppProps) {
  <PrimeReactProvider >
     return <Component {...pageProps} />;
  </PrimeReactProvider>
 
}

export default MyApp;
