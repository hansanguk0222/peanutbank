import { AppContext, AppInitialProps, AppProps, Container } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@/src/styles/global-styled';
import { theme } from '@/src/styles/theme';
import { NextComponentType } from 'next';
import { wrapper } from '@/src/store';
import { CommonLayout } from '@/src/components/organisms/CommonLayout';
import { useState, useEffect } from 'react';
import { LinkURLAndButtonType } from '@/src/components/molecules/LeftSideBar';
import { useRouter } from 'next/router';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [menu, setMenu] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const leftSideBarOnClick: (url: string) => void = (url: string) => {
    setMenu(url);
  };
  const headerBarOnClick: () => void = () => {
    setModalVisible(!modalVisible);
  };
  const linkURLAndButtonTypes: LinkURLAndButtonType[] = [
    { aType: 'leftSideBarLink', url: 'income-and-expenditure', label: '수입/지출', isSelected: menu === 'income-and-expenditure' },
    { aType: 'leftSideBarLink', url: 'calendar', label: '달력', isSelected: menu === 'calendar' },
    { aType: 'leftSideBarLink', url: 'detail', label: '상세분석', isSelected: menu === 'detail' },
    { aType: 'leftSideBarLink', url: 'mypage', label: '마이페이지', isSelected: menu === 'mypage' },
  ];
  useEffect(() => {
    const path = router.asPath.slice(1);
    setMenu(path);
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>
          {router.pathname.startsWith('/income-and-expenditure') || router.pathname.startsWith('/calendar') || router.pathname.startsWith('/detail') || router.pathname.startsWith('/mypage') ? (
            <CommonLayout
              buttonType="profileButton"
              headerBarOnClick={headerBarOnClick}
              leftSideBarOnClick={leftSideBarOnClick}
              linkURLAndButtonTypes={linkURLAndButtonTypes}
              src="https://www.askbayou.com/wp-content/uploads/2021/02/square.jpg"
            >
              <Component {...pageProps} />
            </CommonLayout>
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

  if (Component.getInitialProps) {
    pageProps = (await Component.getInitialProps(ctx)) || {};

    return { pageProps };
  }
};

export default wrapper.withRedux(MyApp);
