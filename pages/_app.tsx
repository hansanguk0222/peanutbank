import { AppContext, AppInitialProps, AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@/src/styles/global-styled';
import { theme } from '@/src/styles/theme';
import { NextComponentType } from 'next';
import wrapper from '@/src/store';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default wrapper.withRedux(MyApp);
