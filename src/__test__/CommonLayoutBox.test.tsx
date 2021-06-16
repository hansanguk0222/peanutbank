/**
 * @jest-environment jsdom
 */
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/src/styles/theme';
import { Fuck } from './Fuck';
import { CommonLayoutBox } from '@/src/components/container/CommonLayoutBox';

configure({ adapter: new Adapter() });

const MockTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

jest.mock(
  'next/link',
  () =>
    ({ children }) =>
      children
);

describe('수입 지출 화면 테스트', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('공통 컴포넌트가 잘 나오는지만 테스트', async () => {
    render(
      <MockTheme>
        <CommonLayoutBox src="http://www.sisaweek.com/news/photo/201801/101675_82604_3521.jpg" routerPath="/calendar" />
      </MockTheme>
    );
    //헤더바
    expect(screen.getByText('PeanutBank')).toBeInTheDocument();
    expect(screen.getByAltText('프로필')).toBeInTheDocument();

    // //LeftSideBar
    expect(screen.getByText('수입/지출')).toBeInTheDocument();
    expect(screen.getByText('달력')).toBeInTheDocument();
    expect(screen.getByText('상세분석')).toBeInTheDocument();
    expect(screen.getByText('마이페이지')).toBeInTheDocument();
  });

  it('원하는 탭이 잘 눌리는지 확인', () => {
    render(
      <MockTheme>
        <CommonLayoutBox src="http://www.sisaweek.com/news/photo/201801/101675_82604_3521.jpg" routerPath="/mypage" />
      </MockTheme>
    );

    screen.getByText('달력').click();
    expect(screen.getByText('달력')).toHaveStyle('background: #4F5B69');
  });
});
