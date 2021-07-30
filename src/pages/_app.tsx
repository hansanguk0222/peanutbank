import { AppContext, AppInitialProps, AppProps, Container } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@/src/styles/global-styled';
import { theme } from '@/src/styles/theme';
import { NextComponentType } from 'next';
import { wrapper } from '@/src/store';
import { CommonLayout } from '@/src/components/organisms/CommonLayout';
import { CommonLayoutBox } from '@/src/components/container/CommonLayoutBox';
import { useRouter } from 'next/router';
import API from '@/src/services/API';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>
          {router.pathname.startsWith('/income-and-expenditure') || router.pathname.startsWith('/calendar') || router.pathname.startsWith('/detail') || router.pathname.startsWith('/mypage') ? (
            <CommonLayoutBox src="http://www.sisaweek.com/news/photo/201801/101675_82604_3521.jpg" routerPath={router.asPath.slice(1)}>
              <Component {...pageProps} />
            </CommonLayoutBox>
          ) : (
            <Component {...pageProps} />
          )}

          <style global jsx>
            {`
              html,
              body,
              body > div:first-child,
              div#__next,
              div#__next > div {
                height: 100%;
                margin: 0;
                padding: 0;
              }
            `}
          </style>
        </Container>
      </ThemeProvider>
    </>
  );
};

MyApp.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};

  const cookie = ctx.req.headers.cookie;

  API.defaults.headers.cookie = cookie;

  if (Component.getInitialProps) {
    pageProps = (await Component.getInitialProps(ctx)) || {};

    return { pageProps };
  }
};

export default wrapper.withRedux(MyApp);
