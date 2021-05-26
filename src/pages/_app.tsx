import { AppContext, AppInitialProps, AppProps, Container } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@/src/styles/global-styled';
import { theme } from '@/src/styles/theme';
import { NextComponentType } from 'next';
import { wrapper } from '@/src/store';
import { CommonLayout } from '@/src/components/organisms/CommonLayout';
import { useState } from 'react';
import { LinkURLAndButtonType } from '@/src/components/molecules/LeftSideBar';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ Component, pageProps }: AppProps) => {
  const [menu, setMenu] = useState<string>('incomeAndExpenditure');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const leftSideBarOnClick: (url: string) => void = (url: string) => {
    setMenu(url);
  };
  const headerBarOnClick: () => void = () => {
    setModalVisible(!modalVisible);
  };
  const linkURLAndButtonTypes: LinkURLAndButtonType[] = [
    { aType: 'leftSideBarLink', url: 'incomeAndExpenditure', label: '수입/지출', isSelected: menu === 'incomeAndExpenditure' },
    { aType: 'leftSideBarLink', url: 'calendar', label: '달력', isSelected: menu === 'calendar' },
    { aType: 'leftSideBarLink', url: 'detail', label: '상세분석', isSelected: menu === 'detail' },
    { aType: 'leftSideBarLink', url: 'mypage', label: '마이페이지', isSelected: menu === 'mypage' },
  ];
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>
          <CommonLayout
            buttonType="profileButton"
            headerBarOnClick={headerBarOnClick}
            leftSideBarOnClick={leftSideBarOnClick}
            linkURLAndButtonTypes={linkURLAndButtonTypes}
            src="https://www.askbayou.com/wp-content/uploads/2021/02/square.jpg"
          >
            <Component {...pageProps} />
          </CommonLayout>
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

export default wrapper.withRedux(MyApp);
