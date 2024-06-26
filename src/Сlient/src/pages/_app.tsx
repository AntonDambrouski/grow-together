import { AppProps } from 'next/app';
import { GlobalStateProvider } from './../GlobalStateContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalStateProvider>
      <Component {...pageProps} />
    </GlobalStateProvider>
  );
}

export default MyApp;
